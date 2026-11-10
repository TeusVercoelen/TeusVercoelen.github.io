document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".teaser-svg").forEach(svg => {
    const trigger = svg.querySelector(".svg-trigger");
    const staticGroups = svg.querySelectorAll(".static-group");
    const fadeWrappers = svg.querySelectorAll(".fade-wrapper");

    if (!trigger || !staticGroups.length || !fadeWrappers.length) return;

    let fadeTimeout;

    svg.pauseAnimations();
    svg.setCurrentTime(0);

    trigger.addEventListener("mouseenter", () => {
      clearTimeout(fadeTimeout);

      // Immediately disable transitions
      [...staticGroups, ...fadeWrappers].forEach(group => {
        group.style.transition = "none";
      });

      // Immediately switch visibility
      staticGroups.forEach(group => group.style.opacity = "0");
      fadeWrappers.forEach(wrapper => wrapper.style.opacity = "1");

      // Restart SVG animation from the beginning
      svg.setCurrentTime(0);
      svg.unpauseAnimations();
    });

    trigger.addEventListener("mouseleave", () => {
      svg.pauseAnimations();

      // Enable fade transitions
      [...staticGroups, ...fadeWrappers].forEach(group => {
        group.style.transition = "opacity 500ms ease";
      });

      requestAnimationFrame(() => {
        staticGroups.forEach(group => group.style.opacity = "1");
        fadeWrappers.forEach(wrapper => wrapper.style.opacity = "0");
      });

      clearTimeout(fadeTimeout);

      fadeTimeout = setTimeout(() => {
        svg.setCurrentTime(0);

        [...staticGroups, ...fadeWrappers].forEach(group => {
          group.style.transition = "none";
        });
      }, 500);
    });
  });
});