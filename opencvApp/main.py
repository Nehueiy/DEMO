import cv2

# Corrected path without extra quotes
path = r"C:\Users\neha_\OneDrive\Desktop\Git-pository\DEMO\opencvApp\tomato.png"

# Reading an image in grayscale mode
image = cv2.imread(path, 0)

# Check if image was loaded successfully
if image is None:
    print("Error: Image not found at the specified path.")
else:
    # Window name in which image is displayed
    window_name = 'image'

    # Display the image
    cv2.imshow(window_name, image)

    # Wait for user to press any key
    cv2.waitKey(0)



    # Close all open windows
    cv2.destroyAllWindows()







    
