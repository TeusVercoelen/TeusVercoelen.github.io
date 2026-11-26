function getSvgAnimationDuration(svg) {
  const animation = svg.querySelector("[dur]");

  if (!animation) return null;

  const dur = animation.getAttribute("dur").trim();

  if (dur.endsWith("ms")) {
    return parseFloat(dur);
  }

  if (dur.endsWith("s")) {
    return parseFloat(dur) * 1000;
  }

  // Bare number: seconds
  return parseFloat(dur) * 1000;
}


document.addEventListener("DOMContentLoaded", () => {
  const isTouch = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  );

  document.querySelectorAll(".archive__item-teaser").forEach(teaser => {
    const svg = teaser.querySelector(".teaser-svg");
    const trigger = svg?.querySelector(".svg-trigger");
    const playButton = teaser.querySelector(".teaser-play-button");

    if (!svg || !trigger) return;

    const staticGroups = svg.querySelectorAll(".static-group");
    const fadeWrappers = svg.querySelectorAll(".fade-wrapper");

    if (!staticGroups.length || !fadeWrappers.length) return;

    let fadeTimeout;
    let animationTimeout;
    let isPlaying = false;

    // Automatically detect the SVG animation duration.
    const animationDuration = getSvgAnimationDuration(svg);

    function startAnimation() {
      if (isPlaying) return;

      isPlaying = true;

      clearTimeout(fadeTimeout);
      clearTimeout(animationTimeout);

      [...staticGroups, ...fadeWrappers].forEach(group => {
        group.style.transition = "none";
      });

      staticGroups.forEach(group => {
        group.style.opacity = "0";
      });

      fadeWrappers.forEach(wrapper => {
        wrapper.style.opacity = "1";
      });

      svg.setCurrentTime(0);
      svg.unpauseAnimations();

      if (playButton) {
        playButton.hidden = true;
      }
    }

    function finishAnimation() {
      if (!isPlaying) return;

      isPlaying = false;

      clearTimeout(animationTimeout);

      svg.pauseAnimations();

      [...staticGroups, ...fadeWrappers].forEach(group => {
        group.style.transition = "opacity 500ms ease";
      });

      requestAnimationFrame(() => {
        staticGroups.forEach(group => {
          group.style.opacity = "1";
        });

        fadeWrappers.forEach(wrapper => {
          wrapper.style.opacity = "0";
        });
      });

      fadeTimeout = setTimeout(() => {
        svg.setCurrentTime(0);

        [...staticGroups, ...fadeWrappers].forEach(group => {
          group.style.transition = "none";
        });

        if (playButton && isTouch.matches) {
          playButton.hidden = false;
        }
      }, 500);
    }

    // Initial state
    svg.pauseAnimations();
    svg.setCurrentTime(0);

    if (isTouch.matches && playButton) {
      playButton.addEventListener("click", () => {
        if (animationDuration === null) {
          console.warn(
            "Could not determine SVG animation duration:",
            svg
          );
          return;
        }

        startAnimation();

        animationTimeout = setTimeout(
          finishAnimation,
          animationDuration
        );
      });
    } else {
      trigger.addEventListener("mouseenter", startAnimation);
      trigger.addEventListener("mouseleave", finishAnimation);
    }
  });
});
