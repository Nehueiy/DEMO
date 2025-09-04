# # import cv2 as cv
# # import sys
# # import numpy as np
# # img = cv.imread('tomato.png')
# # if img is None:
# #     sys.exit("Could not read the image.")
# #     #selection of region of interest(roi)/cropping the selected portion
# # roi = img[230:385,230:355]
# # cv.imshow("ROI Image",roi)
# # print(img.shape)
# # #img[row start:row end, col-start:col-end]

# # height= 385-230
# # width= 355-230
# # img[0:height, 0:width]=roi
# # cv.imshow("Overlapped image", img)
# # cv.waitKey()
# import cv2 as cv
# import sys
# import numpy as np

# # Load image
# img = cv.imread('tomato.png')
# if img is None:
#     sys.exit("Could not read the image.")

# # Select region of interest (ROI)
# roi = img[230:385, 230:355]  # Crop ROI of size 155x125
# cv.imshow("ROI Image", roi)

# # Get exact dimensions from ROI shape
# height, width = roi.shape[:2]

# # Paste ROI into top-left corner
# img[0:height, 0:width] = roi

# # Show final image
# cv.imshow("Overlapped image", img)
# cv.waitKey()
# cv.destroyAllWindows()
import cv2 as cv
import sys
import numpy as np
img = cv.imread('tomato.png')
if img is None: 
    sys.exit("Couldnot read the image")
img2= cv.imread('tomato.png', 0)
cv.imshow("Grayscale Image", img2)
ret, thresh1= cv.threshold(img2,127,255,cv.THRESH_BINARY)
cv.imshow("Thresholded Image", thresh1)
cv.waitKey(0)