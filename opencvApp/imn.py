import cv2  # Import OpenCV

# Step 1: Open the webcam feed
cap = cv2.VideoCapture(0)  # '0' for the default webcam, replace with video file path if needed

# Step 2: Check if the webcam is accessible
if not cap.isOpened():
    print("Error: Cannot access the webcam.")
    exit()

print("Press 'q' to exit.")

while True:
    # Step 3: Capture frames from the webcam
    ret, frame = cap.read()

    if not ret:
        print("Error: Failed to grab frame.")
        break

    # Step 4: Convert the frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Step 5: Display the original and grayscale frames
    cv2.imshow("Webcam Feed (Original)", frame)
    cv2.imshow("Webcam Feed (Grayscale)", gray_frame)

    # Step 6: Exit loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Step 7: Release the webcam and close windows
cap.release()
cv2.destroyAllWindows()