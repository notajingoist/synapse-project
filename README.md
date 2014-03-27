synapse-project
===============
###03-362 Cellular Neuroscience - Synapse Project: Attentional Effects on Neuronal Firing - An Interactive Visualization

I chose the option of developing an artistic or musical representation of the synapse in action, using any media. Specifically, I created a web-based interactive visual simulation of the effects of attention on neuronal firing. Several studies I looked at discuss the way in which visual attention modulates communication in neural circuits by increasing neuronal firing and synchrony, thereby increasing sensitivity of neurons in areas like V4 [2].

Attention, especially visual attention, plays a key role in selecting what information should receive the limited processing resources of the brain. The main behavioral effects of attention include enhanced detection and faster reaction times. In my research, I found that the effects of attention can be observed in numerous sensory areas stretching from area V1 to visual cortical areas in the parietal and temporal lobes, though the greatest attentional effects are seen in “late” rather than “early” areas in the visual system. Attention seems to enhance neuronal communication by increasing the efficacy (the percent of presynaptic shocks that evoke a postsynaptic spike) of presynaptic input in driving postsynaptic responses, by increasing synchronous responses among ensembles of postsynaptic neurons receiving independent input, and by decreasing redundant signals between postsynaptic neurons receiving common input. [2]. There are two main hypotheses about these underlying mechanisms of the neuronal correlates of visual attention. One hypothesis is biased competition, which is the idea that when multiple stimuli appear in the visual field, the firing rate of the neurons encoding the attended stimuli is biased over those neurons encoding unattended stimuli. The other hypothesis is that the neurons that are activated by attended stimuli show increased gamma-frequency synchronization compared with neurons activated by unattended stimuli. [3]

In my project, the viewer’s eye movement serves as a representation of where his or her attention is directed. While the attended location does not necessarily need to correspond with the direction in which the eye is pointed, there is certainly a relationship between attentional shifts and eye movements. In my research, I found that a stimulus evokes a greater response in the parietal cortex and other cortical areas if a saccadic eye movement occurs. (Also, there has been research about frontal eye fields (FEF), or the motor fields of neurons, that has shown that the brain circuitry responsible for directing the eyes to objects of interest may play a critical role in guiding attention. When the FEF was simulated in this study, activity in V4 increased, showing that guidance of attention is integrated with a system used to move the eyes.) [1] As such, there exists a close association between eye movements and attention; I emphasized this by enabling the webcam to “track eye movement.” (Technically, my tracking code is very basic and just follows the viewer’s head and face, but we can think of it as vaguely tracking the eye.) [1]


At arbitrary time intervals, various stimuli are presented on screen (the “receptive field”). If the user happens to be attending to a particular area of the screen when a stimulus appears at that same attended location, the swarm of dots corresponding to that type of stimulus (related by color in my visualization) exhibit an enhanced response. Each class of dots (based on color) vaguely represents the activity recorded from those cells (simple cells that respond strongly to stimuli in one particular orientation) that encode the corresponding visual stimuli (the color is simply a convenient indicator for the user to recognize which dots correspond to which stimuli). The way I visually express this enhanced response is by increasing the number of dots and increasing the speed at which they move. One detail that I tried to reflect was the contrast-gain model, which predicts that attention causes greater increases in response at low contrast than at high contrast [4], as high-contrast stimuli are already at the saturation point on the contrast-response function.
While my project does not specifically model the exact firing rate increases that occur as a result of attention, it does serve as a general artistic reflection of the way attention influences neural activity in areas like V4.
References

===

####References

[1] M. F. Bear, B. W. Conners, and M. A. Paradiso. Neuroscience: Exploring the Brain. Williams & Wilkins, Baltimore, 1996.
<br>
[2] Farran Briggs, George R Mangun, and W Martin Usrey. Attention enhances synaptic efficacy and the signal-to-noise ratio in neural circuits. Nature, 499(7459):476–80, 2013.
<br>
[3] Andres Buehlmann and Gustavo Deco. The neuronal basis of attention: Rate versus synchronization modulation. The Journal of Neuroscience, 28(30):7679–7686, 2008.
<br>
[4] John H Reynolds, Tatiana Pasternak, and Robert Desimone. Attention increases sensitivity of {V4} neurons. Neuron, 26(3):703 – 714, 2000.
