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


## Assumptions

- The mass of the sling is assumed to be negligible.
- Rotational resistance in joints is assumed to be negligible.
- Air drag from <u>arm</u>, <u>sling</u> and <u>counterweight</u> are assumed to be negligible.

## Kinematic relations

### Arm

$$
\begin{aligned}
x_{cg} &= -\ell_{cg}\sin{\theta}
& y_{cg} &= \ell_{cg}\cos{\theta} \\
\dot{x}_{cg} &= -\ell_{cg}\dot{\theta}\cos{\theta}
& \dot{y}_{cg} &= -\ell_{cg}\dot{\theta}\sin{\theta} \\
\ddot{x}_{cg} &= -\ell_{cg}\ddot{\theta}\cos{\theta}
+ \ell_{cg}\dot{\theta}^2\sin{\theta}
& \ddot{y}_{cg} &= -\ell_{cg}\ddot{\theta}\sin{\theta}
- \ell_{cg}\dot{\theta}^2\cos{\theta}
\end{aligned}
$$


### Counterweight

$$
\begin{aligned}
x_{cw} &= \ell_B\sin{\theta} + \ell_{cw}\sin{\psi} \\
\dot{x}_{cw} &= \ell_B\dot{\theta}\cos{\theta} + \ell_{cw}\dot{\psi}\cos{\psi} \\
\ddot{x}_{cw} &= \ell_B\ddot{\theta}\cos{\theta}
- \ell_B\dot{\theta}^2\sin{\theta}
+ \ell_{cw}\ddot{\psi}\cos{\psi}
- \ell_{cw}\dot{\psi}^2\sin{\psi}
\end{aligned}
$$

>

$$
\begin{aligned}
y_{cw} &= -\ell_B\cos{\theta} - \ell_{cw}\cos{\psi} \\
\dot{y}_{cw} &= \ell_B\dot{\theta}\sin{\theta} + \ell_{cw}\dot{\psi}\sin{\psi} \\
\ddot{y}_{cw} &= \ell_B\ddot{\theta}\sin{\theta}
+ \ell_B\dot{\theta}^2\cos{\theta}
+ \ell_{cw}\ddot{\psi}\sin{\psi}
+ \ell_{cw}\dot{\psi}^2\cos{\psi}
\end{aligned}
$$

### Projectile

$$
\begin{aligned}
x_p &= -\ell_A\sin{\theta} + \ell_s\sin{\phi} \\
\dot{x}_p &= -\ell_A\dot{\theta}\cos{\theta} + \ell_s\dot{\phi}\cos{\phi} \\
\ddot{x}_p &= -\ell_A\ddot{\theta}\cos{\theta}
+ \ell_A\dot{\theta}^2\sin{\theta}
+ \ell_s\ddot{\phi}\cos{\phi}
- \ell_s\dot{\phi}^2\sin{\phi}
\end{aligned}
$$

>

$$
\begin{aligned}
y_p &= \ell_A\cos{\theta} - \ell_s\cos{\phi} \\
\dot{y}_p &= -\ell_A\dot{\theta}\sin{\theta} + \ell_s\dot{\phi}\sin{\phi} \\
\ddot{y}_p &= -\ell_A\ddot{\theta}\sin{\theta}
- \ell_A\dot{\theta}^2\cos{\theta}
+ \ell_s\ddot{\phi}\sin{\phi}
+ \ell_s\dot{\phi}^2\cos{\phi}
\end{aligned}
$$


## Equations of motion

### Arm

Sum of moments acting on the arm...

$$
\sum M_O :\quad
T\ell_A\sin{\left(\theta-\phi\right)}
- F_{cw_x}\ell_B\cos{\theta}
- F_{cw_y}\ell_B\sin{\theta}
+ m_a g \ell_{cg}\sin{\theta}
= I_a\ddot{\theta}
$$

>

...leads to equation of motion 1:

$$
1.\quad \ell_A\sin{\left(\phi-\theta\right)}\cdot T
+ \ell_B\cos{\theta}\cdot F_{cw_x}
+ \ell_B\sin{\theta}\cdot F_{cw_y}
+ I_a\cdot\ddot{\theta}
= m_a g \ell_{cg}\sin{\theta}
$$

### Counterweight

The sums of forces along the x- and y-axis acting on the counter weight, as well as the sum of moments acting on it...

$$
\begin{aligned}
\sum M_B :\quad & -F_{cw_x}\ell_{cw}\cos{\psi} - F_{cw_y}\ell_{cw}\sin{\psi} = I_{cw}\ddot{\psi} \\
\sum F_x :\quad & F_{cw_x} = m_{cw}\ddot{x}_{cw} \\
\sum F_y :\quad & F_{cw_y} - m_{cw}g = m_{cw}\ddot{y}_{cw} 
\end{aligned}
$$

...lead to the equations of motion 2, 3 and 4:

$$
\begin{aligned}
2.\quad & \ell_{cw}\cos{\psi}\cdot F_{cw_x}
+ \ell_{cw}\sin{\psi}\cdot F_{cw_y}
+ I_{cw}\cdot\ddot{\psi}
= 0 \\
3.\quad & -\frac{1}{m_{cw}}\cdot F_{cw_x}
+ \ell_B\cos{\theta}\cdot\ddot{\theta}
+ \ell_{cw}\cos{\psi}\cdot\ddot{\psi}
= \ell_B\dot{\theta}^2\sin{\theta}
+ \ell_{cw}\dot{\psi}^2\sin{\psi} \\
4.\quad & \frac{1}{m_{cw}}\cdot F_{cw_y}
- \ell_B\sin{\theta}\cdot\ddot{\theta}
- \ell_{cw}\sin{\psi}\cdot\ddot{\psi}
= \ell_B\dot{\theta}^2\cos{\theta}
+ \ell_{cw}\dot{\psi}^2\cos{\psi}
+ g
\end{aligned}
$$

### Projectile

The sums of forces along the x- and y-axis acting on the projectile...

$$
\begin{aligned}
\sum F_x :\quad &
-T\sin{\phi} + C_f N - D_x = m_p\ddot{x}_p \\
\sum F_y :\quad &
T\cos{\phi} + N - m_p g - D_y = m_p\ddot{y}_p
\end{aligned}
$$

...lead to equations of motion 5 and 6:

$$
\begin{aligned}
5.\quad & -\frac{\sin{\phi}}{m_p}\cdot T
+ \frac{C_f}{m_p}\cdot N
+ \ell_A\cos{\theta}\cdot\ddot{\theta}
- \ell_s\cos{\phi}\cdot\ddot{\phi}
= \ell_A\dot{\theta}^2\sin{\theta}
- \ell_s\dot{\phi}^2\sin{\phi} + \frac{D_x}{m_p} \\
6.\quad & \frac{\cos{\phi}}{m_p}\cdot T
+ \frac{1}{m_p}\cdot N
+ \ell_A\sin{\theta}\cdot\ddot{\theta}
- \ell_s\sin{\phi}\cdot\ddot{\phi}
= -\ell_A\dot{\theta}^2\cos{\theta}
+ \ell_s\dot{\phi}^2\cos{\phi}
+ g + \frac{D_y}{m_p}
\end{aligned}
$$

The aerodynamic drag force components a long the x- and y-axis are determined as follows:

$$
D = C_D\frac{1}{2}\rho V^2S
\qquad
\text{with}
\qquad
V = \sqrt{\dot{x}_p^2+\dot{y}_p^2}
$$

>

$$
\begin{aligned}
D_x &= \frac{\dot{x}_p}{V}D = C_D\frac{1}{2}\rho\dot{x}_p VS & 
D_y &= \frac{\dot{y}_p}{V}D = C_D\frac{1}{2}\rho\dot{y}_p VS
\end{aligned}
$$

Finally, a constraint is added to ensure that the projectile does not accelarate through the ground during the initial phase of it's launch.

$$
\ddot{y}_p = 0 
$$

This leads to equation of motion 7:

$$
7.\quad -\ell_A\ddot{\theta}\sin{\theta} + \ell_s\ddot{\phi}\sin{\phi} = \ell_A\dot{\theta}^2\cos{\theta} - \ell_s\dot{\phi}^2\cos{\phi}
$$

## System of equations
The seven equations of motion are combined into a linear system with a state vector containing the tension of the sling, $$T$$, the normal force action on the projectile, $$N$$, the horizontal and vertical forces on the counter weight joint, $$F_{cw_x}$$ and $$F_{cw_y}$$, and the angular accelerations of the arm, sling and counter weight, $$\ddot{\theta}$$, $$\ddot{\phi}$$ and $$\ddot{\psi}$$.

This system of equations is solved to obtain the state vector. Angular accelarations $$\ddot{\theta}$$, $$\ddot{\phi}$$ and $$\ddot{\psi}$$ are used to determine angular velocities $$\dot{\theta}$$, $$\dot{\phi}$$ and $$\dot{\psi}$$ and angles $$\theta$$, $$\phi$$ and $$\psi$$ using a Runge-Kutta-4 time stepping scheme. Forces $$T$$ and $$N$$ are used to determine stage progression.

When $$N$$ is found to be negative, progression to stage 2 occurs, in which the vertical constraint on the projectile is released. When $$T$$ is found to be negative, or wben $$\phi$$ exceeds target angle $$\phi_\mathrm{target}$$, progression to stage 3 occurs, in which the projectile and sling are no longer taken into account. 

### Stage 1 − grounded


<div class="math-scroll">
$$
\left[
\begin{array}{ccccccc}
\ell_A\sin{\left(\phi-\theta\right)} & 0 & \ell_B\cos{\theta} & \ell_B\sin{\theta} & I_a & 0 & 0 \\
0 & 0 & \ell_{cw}\cos{\psi} & \ell_{cw}\sin{\psi} & 0 & 0 & I_{cw} \\
0 & 0 & -\frac{1}{m_{cw}} & 0 & \ell_B\cos{\theta} & 0 & \ell_{cw}\cos{\psi} \\
0 & 0 & 0 & \frac{1}{m_{cw}} & -\ell_b\sin{\theta} & 0 & -\ell_{cw}\sin{\psi} \\
-\frac{\sin{\phi}}{m_p} & \frac{C_f}{m_p} & 0 & 0 & \ell_A\cos{\theta} & -\ell_s\cos{\phi} & 0 \\
\frac{\cos{\phi}}{m_p} & \frac{1}{m_p} & 0 & 0 & \ell_A\sin{\theta} & -\ell_s\sin{\phi} & 0 \\
0 & 0 & 0 & 0 & -\ell_A\sin{\theta} & \ell_s\sin{\phi} & 0
\end{array}
\right]
\left[
\begin{array}{c}
T \\
N \\
F_{cw_x} \\
F_{cw_y} \\
\ddot{\theta} \\
\ddot{\phi} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
m_a g\ell_{cg}\sin{\theta} \\
0 \\
\ell_B\dot{\theta}^2\sin{\theta} + \ell_{cw}\dot{\psi}^2\sin{\psi} \\
\ell_B\dot{\theta}^2\cos{\theta} + \ell_{cw}\dot{\psi}^2\cos{\psi} + g \\
\ell_A\dot{\theta}^2\sin{\theta} - \ell_s\dot{\phi}^2\sin{\phi} + \frac{D_x}{m_p} \\
-\ell_A\dot{\theta}^2\cos{\theta} + \ell_s\dot{\phi}^2\cos{\phi} + g + \frac{D_y}{m_p} \\
\ell_A\dot{\theta}^2\cos{\theta} - \ell_s\dot{\phi}^2\cos{\phi}
\end{array}
\right]
$$
</div>

### Stage 2 − connected

<div class="math-scroll">
$$
\left[
\begin{array}{cccccc}
\ell_A\sin{\left(\phi-\theta\right)} & \ell_B\cos{\theta} & \ell_B\sin{\theta} & I_a & 0 & 0 \\
0 & \ell_{cw}\cos{\psi} & \ell_{cw}\sin{\psi} & 0 & 0 & I_{cw} \\
0 & -\frac{1}{m_{cw}} & 0 & \ell_B\cos{\theta} & 0 & \ell_{cw}\cos{\psi} \\
0 & 0 & \frac{1}{m_{cw}} & -\ell_b\sin{\theta} & 0 & -\ell_{cw}\sin{\psi} \\
-\frac{\sin{\phi}}{m_p} & 0 & 0 & \ell_A\cos{\theta} & -\ell_s\cos{\phi} & 0 \\
\frac{\cos{\phi}}{m_p} & 0 & 0 & \ell_A\sin{\theta} & -\ell_s\sin{\phi} & 0
\end{array}
\right]
\left[
\begin{array}{c}
T \\
F_{cw_x} \\
F_{cw_y} \\
\ddot{\theta} \\
\ddot{\phi} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
m_a g\ell_{cg}\sin{\theta} \\
0 \\
\ell_B\dot{\theta}^2\sin{\theta} + \ell_{cw}\dot{\psi}^2\sin{\psi} \\
\ell_B\dot{\theta}^2\cos{\theta} + \ell_{cw}\dot{\psi}^2\cos{\psi} + g \\
\ell_A\dot{\theta}^2\sin{\theta} - \ell_s\dot{\phi}^2\sin{\phi} + \frac{D_x}{m_p} \\
-\ell_A\dot{\theta}^2\cos{\theta} + \ell_s\dot{\phi}^2\cos{\phi} + g + \frac{D_y}{m_p}
\end{array}
\right]
$$
</div>

### Stage 3 − disconnected

<div class="math-scroll">
$$
\left[
\begin{array}{cccc}
\ell_B\cos{\theta} & \ell_B\sin{\theta} & I_a & 0 \\
\ell_{cw}\cos{\psi} & \ell_{cw}\sin{\psi} & 0 & I_{cw} \\
-\frac{1}{m_{cw}} & 0 & \ell_B\cos{\theta} & \ell_{cw}\cos{\psi} \\
0 & \frac{1}{m_{cw}} & -\ell_b\sin{\theta} & -\ell_{cw}\sin{\psi}
\end{array}
\right]
\left[
\begin{array}{c}
F_{cw_x} \\
F_{cw_y} \\
\ddot{\theta} \\
\ddot{\psi}
\end{array}
\right]
=
\left[
\begin{array}{c}
m_a g\ell_{cg}\sin{\theta} \\
0 \\
\ell_B\dot{\theta}^2\sin{\theta} + \ell_{cw}\dot{\psi}^2\sin{\psi} \\
\ell_B\dot{\theta}^2\cos{\theta} + \ell_{cw}\dot{\psi}^2\cos{\psi} + g
\end{array}
\right]
$$
</div>

## Verification

### Energy

<div class="math-scroll">
$$
\begin{aligned}
E_a &= \frac{1}{2}m_a\left(\dot{x}_{cg}^2+\dot{y}_{cg}^2\right)
+ \frac{1}{2}I_a\dot{\theta}^2
+ m_a g y_{cg} \\
E_p &= \frac{1}{2}m_p\left(\dot{x}_p^2+\dot{y}_p^2\right)
+ m_p g y_p \\
E_{cw} &= \frac{1}{2}m_{cw}\left(\dot{x}_{cw}^2+\dot{y}_{cw}^2\right)
+ \frac{1}{2}I_{cw}\dot{\psi}^2
+ m_{cw} g y_{cw}
\end{aligned}
$$
</div>

<!-- ### Translational velocities

$$
\begin{aligned}
\dot{x}_{cg}^2 &= \ell_{cg}^2\dot{\theta}^2\cos^2{\theta} \\
\dot{y}_{cg}^2 &= \ell_{cg}^2\dot{\theta}^2\sin^2{\theta} \\
\dot{x}_{cg}^2+\dot{y}_{cg}^2 &= \ell_{cg}^2\dot{\theta}^2
\end{aligned}
$$

> 

$$
\begin{aligned}
\dot{x}_p^2
&= \ell_A^2\dot{\theta}^2\cos^2{\theta}
- 2\ell_A\ell_s\dot{\theta}\dot{\phi}\cos{\theta}\cos{\phi}
+ \ell_s^2\dot{\phi}^2\cos^2{\phi} \\
\dot{y}_p^2
&= \ell_A^2\dot{\theta}^2\sin^2{\theta}
- 2\ell_A\ell_s\dot{\theta}\dot{\phi}\sin{\theta}\sin{\phi}
+ \ell_s^2\dot{\phi}^2\sin^2{\phi} \\
\dot{x}_p^2+\dot{y}_p^2
&= \ell_A^2\dot{\theta}^2
- 2\ell_A\ell_s\dot{\theta}\dot{\phi}
\cos{\left(\theta-\phi\right)}
+ \ell_s^2\dot{\phi}^2
\end{aligned}
$$

>

$$
\begin{aligned}
\dot{x}_{cw}^2
&= \ell_B^2\dot{\theta}^2\cos^2{\theta}
+ 2\ell_B\ell_{cw}\dot{\theta}\dot{\psi}
\cos{\theta}\cos{\psi}
+ \ell_{cw}^2\dot{\psi}^2\cos^2{\psi} \\
\dot{y}_{cw}^2
&= \ell_B^2\dot{\theta}^2\sin^2{\theta}
+ 2\ell_B\ell_{cw}\dot{\theta}\dot{\psi}
\sin{\theta}\sin{\psi}
+ \ell_{cw}^2\dot{\psi}^2\sin^2{\psi} \\
\dot{x}_{cw}^2+\dot{y}_{cw}^2
&= \ell_B^2\dot{\theta}^2
+ 2\ell_B\ell_{cw}\dot{\theta}\dot{\psi}
\cos{\left(\theta-\phi\right)}
+ \ell_{cw}^2\dot{\psi}^2
\end{aligned}
$$

### Expanded energy equations

$$
\begin{aligned}
E_a
&= \frac{1}{2}m_a\ell_{cg}^2\dot{\theta}^2
+ \frac{1}{2}I_a\dot{\theta}^2
+ m_a g \ell_{cg}\cos{\theta} \\
E_p
&= \frac{1}{2}m_p\left(
\ell_A^2\dot{\theta}^2
- 2\ell_A\ell_s\dot{\theta}\dot{\phi}
\cos{\left(\theta+\phi\right)}
+ \ell_s^2\dot{\phi}^2
\right) + m_p g\left(
\ell_A\cos{\theta}-\ell_s\cos{\phi}
\right) \\
E_{cw}
&= \frac{1}{2}m_{cw}\left(
\ell_B^2\dot{\theta}^2
+ 2\ell_B\ell_{cw}\dot{\theta}\dot{\psi}
\cos{\left(\theta+\psi\right)}
+ \ell_{cw}^2\dot{\psi}^2
\right) + \frac{1}{2}I_{cw}\dot{\psi}^2
+ m_{cw}g\left(
-\ell_B\cos{\theta}-\ell_{cw}\cos{\psi}
\right)
\end{aligned}
$$ -->