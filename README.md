# 𝄢

_This project is a collaboration between artist Bethany Williamson and software developer Gabriel Barker._

<img align="left" src="ImageToSoundLogo2.png">
<br/>
<br/>
<br/>
<br/>
<br/>
This project, ImageToSound, seeks to turn images into music. The raw pixel data is extracted from images and processed to produce midi files. The continuing goal of the project is to develop increasingly sophisticated rules to capture the essential aspects of the image, and reflect them in the sounds produced.
<br/>
<br/>
<br/>
<br/>
<br/>

## Image To Sound App

We have produced an electron app to serve as an easy way to interface with the project. Different algorithms can be selected to determine the pattern and progression that create the melody. Furthermore, scale can also be selected. Due to the enormous volume of data that is contained in an image, the images should be compressed. This can be done through the app. On clicking 'Generate', a midi file is generated in the directory that the image was found.

## Back End

The back end is easy to interface with. The design is essentially such that the PixelMusicalData class has a ProgressionCreator and a PatternCreator, injected at construction. These can be swapped out, and new ProgressionCreators and PatternCreators are easy to write as they have a minimal interface. The PixelMusicalData class can be used alongside scribbletune to create midi files.

## Contributing

Contribution in any form is very welcome. Suggestions and bugs are welcome too. See the issues section of the repo.
