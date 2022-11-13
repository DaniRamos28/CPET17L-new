from datetime import datetime
import cv2
import pandas as panda
import time
import requests
import os
import base64

path = os.path.dirname(os.path.realpath(__file__))

# Assigning our initial state in the form of variable initialState as None for initial frames  
initialState = None  

# List of all the tracks when there is any detected of motion in the frames  
motionTrackList= [ None, None ]  

# A new list ‘time’ for storing the time when movement detected  
motionTime = []  

# Initialising DataFrame variable ‘dataFrame’ using pandas libraries panda with Initial and Final column  
dataFrame = panda.DataFrame(columns = ["Initial", "Final"])  

url = 'http://localhost:3000/capture'

# Output => OK



# starting the webCam to capture the video using cv2 module  
video = cv2.VideoCapture(0)  

# using infinite loop to capture the frames from the video 
while True:  

   # Reading each image or frame from the video using read function 

   check, cur_frame = video.read()  

   # Defining 'motion' variable equal to zero as initial frame 

   var_motion = 0  

   # From colour images creating a gray frame 

   gray_image = cv2.cvtColor(cur_frame, cv2.COLOR_BGR2GRAY)  

   # To find the changes creating a GaussianBlur from the gray scale image  

   gray_frame = cv2.GaussianBlur(gray_image, (21, 21), 0)  

   # For the first iteration checking the condition

   # we will assign grayFrame to initalState if is none  

   if initialState is None:  

       initialState = gray_frame  

       continue  

       

   # Calculation of difference between static or initial and gray frame we created  

   differ_frame = cv2.absdiff(initialState, gray_frame)  

   

   # the change between static or initial background and current gray frame are highlighted 

   

   thresh_frame = cv2.threshold(differ_frame, 30, 255, cv2.THRESH_BINARY)[1]  

   thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)  

   

   # For the moving object in the frame finding the coutours 

   cont,_ = cv2.findContours(thresh_frame.copy(),   

                      cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  

   

   for cur in cont:  

       if cv2.contourArea(cur) < 10000:  

           continue  

       var_motion = 1  

       (cur_x, cur_y,cur_w, cur_h) = cv2.boundingRect(cur)  

       

       # To create a rectangle of green color around the moving object  

       cv2.rectangle(cur_frame, (cur_x, cur_y), (cur_x + cur_w, cur_y + cur_h), (0, 255, 0), 3)  

       

  # from the frame adding the motion status   

   motionTrackList.append(var_motion)  

   motionTrackList = motionTrackList[-2:]  



       

  # Adding the End time of the motion 

   #motion to vid
   if motionTrackList[-1] == 1 and motionTrackList[-2]==0:
        start_time=str(datetime.now())
    #save vid and date time to node
   if motionTrackList[-1] == 0 and motionTrackList[-2]==1:
        motionTime.append(datetime.now()) 
        start_time=str(datetime.now())
        print ('START:' +start_time)
        cv2.imwrite(str(path) + '\capimage.jpg', cur_frame)
        print('END:'+str(datetime.now()))
        file= open('capimage.jpg','rb').read()
        file=base64.b64encode(file)
        file=file.decode('utf-8')

        data={'date_time':start_time, "capture":str(file)}
        res=requests.post('http://127.0.0.1:3000/capture', json=data)


  # In the gray scale displaying the captured image 

   cv2.imshow("The image captured in the Gray Frame is shown below: ", gray_frame)  

   # To display the difference between inital static frame and the current frame 

   cv2.imshow("Difference between the  inital static frame and the current frame: ", differ_frame)  

   # To display on the frame screen the black and white images from the video  

   cv2.imshow("Threshold Frame created from the PC or Laptop Webcam is: ", thresh_frame)  

   # Through the colour frame displaying the contour of the object

   cv2.imshow("From the PC or Laptop webcam, this is one example of the Colour Frame:", cur_frame)  

   # Creating a key to wait  

   wait_key = cv2.waitKey(1)  

   # With the help of the 'm' key ending the whole process of our system   

   if wait_key == ord('m'):  

       # adding the motion variable value to motiontime list when something is moving on the screen  

        if var_motion == 1:  

            motionTime.append(datetime.now())
        break 
video.release()
cv2.destroyAllWindows()