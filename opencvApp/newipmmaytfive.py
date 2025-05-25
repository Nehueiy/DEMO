import cv2 as cv
import sys
import numpy as np
img = cv.imread('tomato.png')
if img is None:
    sys.exit("Could not read the image.")
    