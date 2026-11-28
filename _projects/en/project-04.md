---
title: "Trebuchet simulator"
description: "A physics simulation and optimization for trebuchets."
tags:
  - Python
  - Simulation
svg: "/svgs/project-04-teaser.svg"
image: 
image_alt: "Illustration of Project One"
lang: en
translation_key: project-04
permalink: /en/projects/project-04/
author_profile: true
classes: wide
started: 2024-07-01
order: 1
---

<span style="color:#999999">&#91;<i>This page is a work in progress.</i>&#93;</span>

Back in 2024, after building a model trebuchet using rough guidelines I'd found on the internet, I wondered what the ideal shape of a basic trebuchet is. I started working on this trebuchet simulation in Python, which can be used with a genetic optimization algorithm to optimize certain parameters of the model. 

The result of such an optimization is show below. In this example, the angle of the release pin and the lengths of the long arm and sling are optimized to maximize projectile distance. The mass of the counterweight and projectile are held constant at 50 kg and 1000 kg respectively.

<div id="project-svg"></div>

<template id="project-svg-template">
    {% include svgs/project-04-06.svg %}
</template>

<script>
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const template = document.getElementById("project-svg-template");
        const container = document.getElementById("project-svg");

        container.appendChild(template.content.cloneNode(true));
    }, 2000);
});
</script>

>

For the optimization,  a single-objective genetic algorithm from [**pyMOO**](https://pymoo.org/) was used. More details about the physics model can found below.

## Assumptions

- The mass of the sling is assumed to be negligible.
- Rotational resistance in joints is assumed to be negligible.
- Air drag from <u>arm</u>, <u>sling</u> and <u>counterweight</u> are assumed to be negligible.
- The projectile is assumed not to spin.

## Kinematic relations

An abstract representation of the system is shown below. The arm, which spans from $A$ to $B$, pivots around $O$ with angle $\theta$ and has its center of gravity located in $cg$. Connected at $B$ is the counterweight, which pivots with angle $\psi$ and has its center of gravity located at $cw$. Lastly, the projectile is connected to $A$. It pivots with angle $\varphi$ and has its center of gravity located at $p$. Dimensions are defined by $\ell_{A}$, $\ell_{B}$, $\ell_{cg}$, $\ell_{cw}$ and $\ell_{s}$.

{% include /svgs/project-04-01.svg %}

From this definition of the geometry, the kinematic relations for the arm, counterweight and projectile can be derived.

### Arm

Described below are the kinematic relations for the arm, which relate angle $\theta$ and its derivative to cartesian coordinates $x_{cg}$ and $y_{cg}$ and their derivatives.

<div class="math-scroll">
$$
\renewcommand{\phi}{\varphi}
\begin{aligned}
x_{cg} &= -\ell_{cg}\sin{\theta} & y_{cg} &= \ell_{cg}\cos{\theta}\\
\dot{x}_{cg} &= -\ell_{cg}\dot{\theta}\cos{\theta} & \dot{y}_{cg} &= -\ell_{cg}\dot{\theta}\sin{\theta} \\
\ddot{x}_{cg} &= -\ell_{cg}\ddot{\theta}\cos{\theta} 
+ \ell_{cg}\dot{\theta}^2\sin{\theta} & \ddot{y}_{cg} &= -\ell_{cg}\ddot{\theta}\sin{\theta}
- \ell_{cg}\dot{\theta}^2\cos{\theta}
\end{aligned}
$$
</div>

### Counterweight

Described below are the kinematic relations for the counterweight, which relate angles $\theta$ and $\psi$ and its derivative to cartesian coordinates $x_{cw}$ and $y_{cw}$ and their derivatives.

<div class="math-scroll">
$$
\begin{aligned}
x_{cw} &= \ell_B\sin{\theta} + \ell_{cw}\sin{\psi} & y_{cw} &= -\ell_B\cos{\theta} - \ell_{cw}\cos{\psi} \\
\dot{x}_{cw} &= \ell_B\dot{\theta}\cos{\theta} + \ell_{cw}\dot{\psi}\cos{\psi} & \dot{y}_{cw} &= \ell_B\dot{\theta}\sin{\theta} + \ell_{cw}\dot{\psi}\sin{\psi} \\
\ddot{x}_{cw} &= \ell_B\ddot{\theta}\cos{\theta}
- \ell_B\dot{\theta}^2\sin{\theta}
+ \ell_{cw}\ddot{\psi}\cos{\psi}
- \ell_{cw}\dot{\psi}^2\sin{\psi} & \ddot{y}_{cw} &= \ell_B\ddot{\theta}\sin{\theta}
+ \ell_B\dot{\theta}^2\cos{\theta}
+ \ell_{cw}\ddot{\psi}\sin{\psi}
+ \ell_{cw}\dot{\psi}^2\cos{\psi}
\end{aligned}
$$
</div>

### Projectile

Described below are the kinematic relations for the projectile, which relate angles $\theta$ and $\phi$ and its derivative to cartesian coordinates $x_{p}$ and $y_{p}$ and their derivatives.

<div class="math-scroll">
$$
\begin{aligned}
x_p &= -\ell_A\sin{\theta} + \ell_s\sin{\phi} & y_p &= \ell_A\cos{\theta} - \ell_s\cos{\phi}\\
\dot{x}_p &= -\ell_A\dot{\theta}\cos{\theta} + \ell_s\dot{\phi}\cos{\phi} & \dot{y}_p &= -\ell_A\dot{\theta}\sin{\theta} + \ell_s\dot{\phi}\sin{\phi} \\
\ddot{x}_p &= -\ell_A\ddot{\theta}\cos{\theta}
+ \ell_A\dot{\theta}^2\sin{\theta}
+ \ell_s\ddot{\phi}\cos{\phi}
- \ell_s\dot{\phi}^2\sin{\phi} & \ddot{y}_p &= -\ell_A\ddot{\theta}\sin{\theta}
- \ell_A\dot{\theta}^2\cos{\theta}
+ \ell_s\ddot{\phi}\sin{\phi}
+ \ell_s\dot{\phi}^2\cos{\phi}
\end{aligned}
$$
</div>

## Equations of motion

### Counterweight
The free body diagram and kinetic diagram of the counterweight are shown below.

<div style="width: 66%; margin: 0 auto;">
    {% include /svgs/project-04-02.svg %}
</div>

From these diagram the sums of forces along the x- and y-axis acting on the counterweight, as well as the sum of moments acting on it is derived.

<div class="math-scroll">
$$
\begin{aligned}
\sum M_{cw} :\quad & -F_{cw_x}\ell_{cw}\cos{\psi} - F_{cw_y}\ell_{cw}\sin{\psi} = I_{cw}\ddot{\psi} \\
\sum F_x :\quad & F_{cw_x} = m_{cw}\ddot{x}_{cw} \\
\sum F_y :\quad & F_{cw_y} - m_{cw}g = m_{cw}\ddot{y}_{cw} 
\end{aligned}
$$
</div>

Together these lead to the equation of motion 1.

<div class="math-scroll">
$$
1.\quad \ell_B\cos(\theta-\psi)\cdot \ddot{\theta} + \left(\ell_{cw}+\frac{I_{cw}}{m_{cw}\ell_{cw}}\right)\cdot \ddot{\psi} = \ell_B\dot{\theta}^2\sin(\theta-\psi)-g\sin\psi
$$
</div>

### Arm

The free body diagram and kinetic diagram of the arm are shown below.

{% include /svgs/project-04-03.svg %}

From these diagrams the sum of moments acting on the arm is derived.

<div class="math-scroll">
$$
\sum M_O :\quad
T\ell_A\sin{\left(\theta-\phi\right)}
- F_{cw_x}\ell_B\cos{\theta}
- F_{cw_y}\ell_B\sin{\theta}
+ m_a g \ell_{cg}\sin{\theta}
= I_{a_O}\ddot{\theta}
$$
</div>

This leads to equation of motion 2.

<div class="math-scroll">
$$
2.\quad -\frac{\ell_A}{m_{cw}}\sin(\theta-\phi)\cdot T + \left(\frac{I_{a_O}}{m_{cw}} + \ell_B^2\right)\cdot \ddot{\theta} + \ell_{cw}\ell_B\cos(\theta-\psi)\cdot \ddot{\psi} = -\ell_{cw}\ell_B\dot{\psi}^2\sin(\theta-\psi) + \left(\frac{m_a\ell_{cg}}{m_{cw}}-\ell_B\right)g\sin\theta
$$
</div>

### Projectile

The free body diagram and kinetic diagram of the projectile are shown below.

<div style="width: 66%; margin: 0 auto;">
    {% include /svgs/project-04-04.svg %}
</div>

From these diagrams, the sums of forces along the x- and y-axis acting on the projectile are derived.

<div class="math-scroll">
$$
\begin{aligned}
\sum F_x :\quad &
-T\sin{\phi} + C_f N - D_x = m_p\ddot{x}_p \\
\sum F_y :\quad &
T\cos{\phi} + N - m_p g - D_y = m_p\ddot{y}_p
\end{aligned}
$$
</div>

These lead to equations of motion 3 and 4.

<div class="math-scroll">
$$
\begin{aligned}
3.\quad & -\frac{\sin{\phi}}{m_p}\cdot T
+ \frac{C_f}{m_p}\cdot N
+ \ell_A\cos{\theta}\cdot\ddot{\theta}
- \ell_s\cos{\phi}\cdot\ddot{\phi}
= \ell_A\dot{\theta}^2\sin{\theta}
- \ell_s\dot{\phi}^2\sin{\phi} + \frac{D_x}{m_p} \\
4.\quad & \frac{\cos{\phi}}{m_p}\cdot T
+ \frac{1}{m_p}\cdot N
+ \ell_A\sin{\theta}\cdot\ddot{\theta}
- \ell_s\sin{\phi}\cdot\ddot{\phi}
= -\ell_A\dot{\theta}^2\cos{\theta}
+ \ell_s\dot{\phi}^2\cos{\phi}
+ g + \frac{D_y}{m_p}
\end{aligned}
$$
</div>

The aerodynamic drag force components a long the $x$- and $y$-axis are determined as follows:

<div class="math-scroll">
$$
D = C_D\frac{1}{2}\rho V^2S
\qquad
\text{with}
\qquad
V = \sqrt{\dot{x}_p^2+\dot{y}_p^2}
$$
</div>

>

<div class="math-scroll">
$$
\begin{aligned}
D_x &= \frac{\dot{x}_p}{V}D = C_D\frac{1}{2}\rho\dot{x}_p VS \quad & \quad
D_y &= \frac{\dot{y}_p}{V}D = C_D\frac{1}{2}\rho\dot{y}_p VS
\end{aligned}
$$
</div>

Finally, a constraint is added to ensure that the projectile does not accelarate through the ground during the initial phase of it's launch.

$$
\ddot{y}_p = 0 
$$

This leads to equation of motion 5:

<div class="math-scroll">
$$
5.\quad -\ell_A\ddot{\theta}\sin{\theta} + \ell_s\ddot{\phi}\sin{\phi} = \ell_A\dot{\theta}^2\cos{\theta} - \ell_s\dot{\phi}^2\cos{\phi}
$$
</div>

## Model progression

The model progresses through three stages. Firstly, the projectile is dragged over the ground. Next, it is lifted up and finally it is released. 

To determine the motion of the system, the five equations of motion are combined into a linear system of equations. This system of equations is solved to obtain a state vector containing the tension in the sling, $T$, the normal force acting on the projectile, $N$, and the angular accelerations of the arm, sling and counterweight, $\ddot{\theta}$, $\ddot{\phi}$ and $\ddot{\psi}$. Angular accelarations $\ddot{\theta}$, $\ddot{\phi}$ and $\ddot{\psi}$ are used to determine angular velocities $\dot{\theta}$, $\dot{\phi}$ and $\dot{\psi}$ and angles $\theta$, $\phi$ and $\psi$ using a Runge-Kutta-4 time stepping scheme. Forces $T$ and $N$ are used to determine stage progression.

### Stage 1 − Grounded

In stage 1, all equations of motion are taken into account. Subsequently, the system of equations for this stage is as follows:

<div class="math-scroll">
$$
\left[
\begin{array}{ccccc}
0 & 0 & \ell_B\cos(\theta-\psi) & 0 & \ell_{cw}+\frac{I_{cw}}{m_{cw}\ell_{cw}} \\
-\frac{\ell_A}{m_{cw}}\sin(\theta-\phi) & 0 & \frac{I_{a_O}}{m_{cw}} + \ell_B^2 & 0 & \ell_{cw}\ell_B\cos(\theta-\psi) \\
-\frac{\sin{\phi}}{m_p} & \frac{C_f}{m_p} & \ell_A\cos{\theta} & -\ell_s\cos{\phi} & 0 \\
\frac{\cos{\phi}}{m_p} & \frac{1}{m_p} & \ell_A\sin{\theta} & -\ell_s\sin{\phi} & 0 \\
0 & 0 & -\ell_A\sin{\theta} & \ell_s\sin{\phi} & 0
\end{array}
\right]
\left[
\begin{array}{c}
T \\
N \\
\ddot{\theta} \\
\ddot{\phi} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
\ell_B\dot{\theta}^2\sin(\theta-\psi)-g\sin\psi\\
-\ell_{cw}\ell_B\dot{\psi}^2\sin(\theta-\psi)+\left(\frac{m_a\ell_{cg}}{m_{cw}}-\ell_B\right)g\sin\theta\\
\ell_A\dot{\theta}^2\sin\theta-\ell_s\dot{\phi}^2\sin\phi+\frac{D_x}{m_p}\\
-\ell_A\dot{\theta}^2\cos\theta+\ell_s\dot{\phi}^2\cos\phi+g+\frac{D_y}{m_p}\\
\ell_A\dot{\theta}^2\cos\theta-\ell_s\dot{\phi}^2\cos\phi
\end{array}
\right]
$$
</div>

### Stage 2 − Connected

When $$N$$ is found to be negative, progression to stage 2 occurs, in which the vertical constraint on the projectile is removed. Consequently, equation of motion 5 is replaced by setting $N$ to 0. 

<div class="math-scroll">
$$
\left[
\begin{array}{ccccc}
0 & 0 & \ell_B\cos(\theta-\psi) & 0 & \ell_{cw}+\frac{I_{cw}}{m_{cw}\ell_{cw}} \\
-\frac{\ell_A}{m_{cw}}\sin(\theta-\phi) & 0 & \frac{I_{a_O}}{m_{cw}} + \ell_B^2 & 0 & \ell_{cw}\ell_B\cos(\theta-\psi) \\
-\frac{\sin{\phi}}{m_p} & \frac{C_f}{m_p} & \ell_A\cos{\theta} & -\ell_s\cos{\phi} & 0 \\
\frac{\cos{\phi}}{m_p} & \frac{1}{m_p} & \ell_A\sin{\theta} & -\ell_s\sin{\phi} & 0 \\
0 & 1 & 0 & 0 & 0
\end{array}
\right]
\left[
\begin{array}{c}
T \\
N \\
\ddot{\theta} \\
\ddot{\phi} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
\ell_B\dot{\theta}^2\sin(\theta-\psi)-g\sin\psi \\
-\ell_{cw}\ell_B\dot{\psi}^2\sin(\theta-\psi) + \left(\frac{m_a\ell_{cg}}{m_{cw}}-\ell_B\right)g\sin\theta\\
\ell_A\dot{\theta}^2\sin{\theta} - \ell_s\dot{\phi}^2\sin{\phi} + \frac{D_x}{m_p} \\
-\ell_A\dot{\theta}^2\cos{\theta} + \ell_s\dot{\phi}^2\cos{\phi} + g + \frac{D_y}{m_p} \\
0
\end{array}
\right]
$$
</div>

### Stage 3 − Disconnected

In stage 3, the projectile is released and modelled seperately from the remainder of the system. Release of the projectile occurs when the sling slips off the pin at the end of the arm, which is determined by the grazing angle, $$\alpha$$.

$$\alpha = \phi+\delta-\theta-\pi$$

A schematic representation of this is show below. 

{% include /svgs/project-04-05.svg %}

For $\lvert\alpha\rvert \geq \pi/2$, as is the case for the left figure, the sling is seated on both the pin and the end of the arm. In this case $T$ is counteracted by $N$. The sling cannot slip of the pin.

For $\lvert\alpha\rvert < \pi/2$, as is the case for the right figure, $T$ is counteracted by $N$ normal to the pin and by $C_{f_p}N\hspace{0.25em}$ tangential to the pin. 

$$
\begin{aligned}
\sum F_\perp &: \quad T\sin|\alpha| = N \\
\sum F_\parallel &: \quad T\cos\alpha \leq C_{f_p}N 
\end{aligned}
$$

From this force balance follows the first release condition.

$$|\alpha| < \pi/2 \quad\land\quad C_{f_p} < \frac{1}{|\tan\alpha|}$$

As the sling can only be loaded in tension, the projectile disengages when $T$ becomes negative. This is the second release condition.

$$T < 0$$

When either release condition is met, the model progresses to stage 3, where the projectile is modelled seperately from the arm and counterweight. The acceleration of the projectile is as follows:

$$
\begin{aligned}
\ddot{x}_p &= -\frac{D_x}{m_p} \quad & \quad \ddot{y}_p &= -g - \frac{D_x}{m_p}
\end{aligned}
$$

To model the remainder of the system without the projectile and sling, equations of motion 3 and 5 are replaced by setting $T$ and $\ddot{\phi}$ to 0, leading to the following system of equations:

<div class="math-scroll">
$$
\left[
\begin{array}{ccccc}
0 & 0 & \ell_B\cos(\theta-\psi) & 0 & \ell_{cw}+\frac{I_{cw}}{m_{cw}\ell_{cw}} \\
-\frac{\ell_A}{m_{cw}}\sin(\theta-\phi) & 0 & \frac{I_{a_O}}{m_{cw}} + \ell_B^2 & 0 & \ell_{cw}\ell_B\cos(\theta-\psi) \\
1 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 1 & 0 \\
0 & 1 & 0 & 0 & 0
\end{array}
\right]
\left[
\begin{array}{c}
T \\
N \\
\ddot{\theta} \\
\ddot{\phi} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
\ell_B\dot{\theta}^2\sin(\theta-\psi)-g\sin\psi \\
-\ell_{cw}\ell_B\dot{\psi}^2\sin(\theta-\psi) + \left(\frac{m_a\ell_{cg}}{m_{cw}}-\ell_B\right)g\sin\theta\\
0 \\
0 \\
0
\end{array}
\right]
$$
</div>



## Verification

The obtained motion of the system results from a force balance approach. To verify this motion, the total energy in the system can be tracked to verify that it remains constant. 

The total energy in the system consists of potential energy,

<div class="math-scroll">
$$
\begin{aligned}
E_{p_a} &= g m_a y_{cg} \\
E_{p_p} &= g m_p y_p \\
E_{p_{cw}} &= g m_{cw} y_{cw}
\end{aligned}
$$
</div>

kinetic energy, both translational and rotational, 

<div class="math-scroll">
$$
\begin{aligned}
E_{k_a} &= \frac{1}{2}m_a\left(\dot{x}_{cg}^2+\dot{y}_{cg}^2\right)
+ \frac{1}{2}I_a\dot{\theta}^2 \\
E_{k_p} &= \frac{1}{2}m_p\left(\dot{x}_p^2+\dot{y}_p^2\right) \\
E_{k_{cw}} &= \frac{1}{2}m_{cw}\left(\dot{x}_{cw}^2+\dot{y}_{cw}^2\right)
+ \frac{1}{2}I_{cw}\dot{\psi}^2
\end{aligned}
$$
</div>

and energy losses due to friction and aerodynamic drag.

<div class="math-scroll">
$$
\begin{aligned}
E_f &= C_f\int N(t) |\dot{x}_p(t)|dt \\
E_D &= \frac{1}{2}C_D\rho S\int \left(\dot{x}_p^2(t) + \dot{y}_p^2(t)\right)^{\frac{3}{2}} dt
\end{aligned}
$$
</div>