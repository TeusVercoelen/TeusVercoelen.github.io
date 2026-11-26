---
title: "Trebuchet simulator"
description: "Een natuurkundige simulatie en optimalisatie voor trebuchets."
tags:
  - Python
  - Simulation
svg: "/svgs/project-04-teaser.svg"
image: 
image_alt: "Illustration of Project One"
lang: nl
translation_key: project-04
permalink: /nl/projects/project-04/
author_profile: true
classes: wide
started: 2024-07-01
order: 5
---

<span style="color:#999999">&#91;<i>Deze pagina is nog in ontwikkeling en alleen beschikbaar in het engels.</i>&#93;</span>

$$
\renewcommand{\phi}{\varphi}
$$

## Assumptions

- The mass of the sling is assumed to be negligible.
- Rotational resistance in joints is assumed to be negligible.
- Air drag from <u>arm</u>, <u>sling</u> and <u>counterweight</u> are assumed to be negligible.
- The projectile is assumed not to spin.

## Kinematic relations

An abstract representation of the system is shown below. The arm, which spans from $$A$$ to $$B$$, pivots around $$O$$ with angle $$\theta$$ and has its center of gravity located in $$cg$$. Connected at $$B$$ is the counter weight, which pivots with angle $$\psi$$ and has its center of gravity located at $$cw$$. Lastly, the projectile is connected to $$A$$. It pivots with angle $$\phi$$ and has its center of gravity located at $$p$$. Dimensions are defined by $$\ell_{A}$$, $$\ell_{B}$$, $$\ell_{cg}$$, $$\ell_{cw}$$ and $$\ell_{s}$$.

{% include /svgs/project-04-01.svg %}

From this definition of the geometry, the kinematic relations for the arm, counter weight and projectile can be derived.

### Arm

Described below are the kinematic relations for the arm, which relate angle $$\theta$$ and its derivative to cartesian coordinates $$x_{cg}$$ and $$y_{cg}$$ and their derivatives.

<div class="math-scroll">
$$
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

Described below are the kinematic relations for the counter weight, which relate angles $$\theta$$ and $$\psi$$ and its derivative to cartesian coordinates $$x_{cw}$$ and $$y_{cw}$$ and their derivatives.

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

Described below are the kinematic relations for the projectile, which relate angles $$\theta$$ and $$\phi$$ and its derivative to cartesian coordinates $$x_{p}$$ and $$y_{p}$$ and their derivatives.

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
The free body diagram and kinetic diagram of the counter weight are shown below.

<div style="width: 66%; margin: 0 auto;">
    {% include /svgs/project-04-02.svg %}
</div>

The sums of forces along the x- and y-axis acting on the counter weight, as well as the sum of moments acting on it ...

<div class="math-scroll">
$$
\begin{aligned}
\sum M_{cw} :\quad & -F_{cw_x}\ell_{cw}\cos{\psi} - F_{cw_y}\ell_{cw}\sin{\psi} = I_{cw}\ddot{\psi} \\
\sum F_x :\quad & F_{cw_x} = m_{cw}\ddot{x}_{cw} \\
\sum F_y :\quad & F_{cw_y} - m_{cw}g = m_{cw}\ddot{y}_{cw} 
\end{aligned}
$$
</div>

... lead to the equations of motion 1:

<div class="math-scroll">
$$
1.\quad \ell_B\cos(\theta-\psi)\cdot \ddot{\theta} + \left(\ell_{cw}+\frac{I_{cw}}{m_{cw}\ell_{cw}}\right)\cdot \ddot{\psi} = \ell_B\dot{\theta}^2\sin(\theta-\psi)-g\sin\psi
$$
</div>

### Arm

The free body diagram and kinetic diagram of the arm are shown below.

{% include /svgs/project-04-03.svg %}

Sum of moments acting on the arm ...

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

... leads to equation of motion 2:

<div class="math-scroll">
$$
2.\quad -\frac{\ell_A}{m_{cw}}\sin(\theta-\phi)\cdot T + \left(\frac{I_{a_O}}{m_{cw}} + \ell_B^2\right)\cdot \ddot{\theta} + \ell_{cw}\ell_B\cos(\theta-\psi)\cdot \ddot{\psi} = -\ell_{cw}\ell_B\dot{\psi}^2\sin(\theta-\psi) + \left(\frac{m_a\ell_{cg}}{m_{cw}}-\ell_B\right)g\sin\theta
$$
</div>

### Projectile

<div style="width: 66%; margin: 0 auto;">
    {% include /svgs/project-04-04.svg %}
</div>

The sums of forces along the x- and y-axis acting on the projectile ...

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

... lead to equations of motion 3 and 4:

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

The aerodynamic drag force components a long the x- and y-axis are determined as follows:

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
D_x &= \frac{\dot{x}_p}{V}D = C_D\frac{1}{2}\rho\dot{x}_p VS & 
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

## System of equations
The seven equations of motion are combined into a linear system with a state vector containing the tension of the sling, $$T$$, the normal force acting on the projectile, $$N$$, and the angular accelerations of the arm, sling and counter weight, $$\ddot{\theta}$$, $$\ddot{\phi}$$ and $$\ddot{\psi}$$.

This system of equations is solved to obtain the state vector. Angular accelarations $$\ddot{\theta}$$, $$\ddot{\phi}$$ and $$\ddot{\psi}$$ are used to determine angular velocities $$\dot{\theta}$$, $$\dot{\phi}$$ and $$\dot{\psi}$$ and angles $$\theta$$, $$\phi$$ and $$\psi$$ using a Runge-Kutta-4 time stepping scheme. Forces $$T$$ and $$N$$ are used to determine stage progression.

When $$N$$ is found to be negative, progression to stage 2 occurs, in which the vertical constraint on the projectile is released. When $$T$$ is found to be negative, or wben $$\phi$$ exceeds target angle $$\phi_\mathrm{target}$$, progression to stage 3 occurs, in which the projectile and sling are no longer taken into account. 

### Stage 1 − grounded

The systems of equatons for stage 1 is as follows:

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

### Stage 2 − connected

In stage 2, equation of motion 5 is replaced by setting $$N$$ to 0. 

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

### Stage 3 − disconnected

In stage 3, equations of motion 3 and 5 are replaced by setting $$T$$ and $$\ddot{\phi}$$ to 0.

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

The obtained motion of the system results from a force balance approach. To verified this motion, the total energy in the system can be tracked to verify that it remains constant. 

The total energy in the system consists of potential energy ...

<div class="math-scroll">
$$
\begin{aligned}
E_{p_a} &= g m_a y_{cg} \\
E_{p_p} &= g m_p y_p \\
E_{p_{cw}} &= g m_{cw} y_{cw}
\end{aligned}
$$
</div>

... kinetic energy, both translational and rotational, ... 

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

... and energy losses due to friction and aerodynamic drag.

<div class="math-scroll">
$$
\begin{aligned}
E_f &= C_f\int N(t) |\dot{x}_p(t)|dt \\
E_D &= \frac{1}{2}C_D\rho S\int \left(\dot{x}_p^2(t) + \dot{y}_p^2(t)\right)^{\frac{3}{2}} dt
\end{aligned}
$$
</div>