import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom';
import { deleteDraft, driveAPI, getDrafts, saveDraft } from '../services/allAPI';
import { getAuth } from 'firebase/auth';
import SERVERURL from "../services/serverURL"

const EditingComponent = () => {

    const [loading, setLoading] = useState(false)
    const [userDetails, setUserDetails] = useState('')
    const [content, setContent] = useState("")
    const navigate = useNavigate()

    useEffect( () => {
        const storedUser = localStorage.getItem('googleUser')
        if(storedUser){
            try{
                setUserDetails(JSON.parse(storedUser))
            }
            catch(err){
                console.log(err);
            }
        }
    },[])

    useEffect(() => {
        const fetchDrafts = async () => {
            try{
                const userId = userDetails.userId
                const result = await getDrafts(userId) 
                console.log("fetched draft result", result.data[0].content);
                if(result.status == 200){
                    setContent(result.data[0].content)
                }
            }
            catch(err){
                console.log(err.response);
            }
        };
        fetchDrafts()
    }, [userDetails?.userId]);


    const handleLogout = () => {
        localStorage.removeItem('googleUser')
        navigate('/', { replace: true })
        // window.location.href = "/";
    }

    const handleDrive = async () => {
        try {
              // Show loading state
              setLoading(true); // Assuming you have a loading state
          
              // Get the current user from Firebase Auth
              const auth = getAuth();
              const user = auth.currentUser;
              
              if (!user) {
                // Handle case where user is not logged in
                alert('Please sign in to save to Google Drive');
                setLoading(false);
                return;
              }
              
              // Get the ID token from Firebase
              const idToken = await user.getIdToken();
              
              // Get your content (assuming you have this available in a variable)
              const fileContent = content; // Replace with your actual content variable
              
              // Generate a filename (can be customized as needed)
              const fileName = `Document_${new Date().toISOString().slice(0, 10)}.txt`;
            //   console.log("Checking values:", idToken, fileContent, user, fileName);

              const reqBody = { 
                idToken, fileName, fileContent
              }
            //   console.log(reqBody);
              
              // Make API call to your backend
              const response = await driveAPI(reqBody)
              if(response.status(200)){
                const data = await response.json();

                if (data.success) {
                    // Success message
                    alert(`Successfully saved to Google Drive! File ID: ${data.fileId}`);
                  } else {
                    // Error message
                    alert(`Error saving to Drive: ${data.message}`);
                  }
              }

            } catch (error) {
              console.error('Error saving to Drive:', error);
              alert(`Failed to save to Drive: ${error.message}`);
            } finally {
              // Hide loading state
              setLoading(false);
            }
    };


    const handleDraft = async () => {
        // get items to be passed: id, content
        try{
            
            if(content==''){
                alert("No content to save")
            }
            const reqBody = {
                userId : userDetails.userId,
                content : content
            }           
            console.log(reqBody);
            
            // api call
            const result = await saveDraft(reqBody)
            console.log(result);
            
            if(result.status == 200){
                alert("Draft Saved")
            }
        }
        catch(err){
            console.log(err); 
        }
    }

    const handleClear = async () => {
        try{
            const result = await deleteDraft({userId: userDetails.userId})
            console.log(result);
            setContent('');
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <div className="letter-editor-container ">
        <h1 className='text-center my-3 text-warning'>Online Text Editor</h1>
        <h2 className='ps-3'>Welcome <span className='text-warning fw-bold'>{userDetails?.name ? userDetails.name.split(" ")[0] : 'User'},</span></h2>
        <button onClick={handleLogout} className='btn btn-warning ms-auto me-2 mb-3' style={{width:'100px'}}>Logout</button>
        <div className='container-fluid'>
            <div className='row '>
                <div className='col-sm-12'>
                    <ReactQuill className='editor' theme='snow' value={content} onChange={setContent}  placeholder="Write your letter here..."/>
                </div>
            </div>
        </div>

        <div className='editorFooter'>
            <button onClick={handleDrive} className='btn btn-warning fw-semibold me-5'>Save to Drive</button>
            <button onClick={handleDraft} className='btn btn-warning fw-semibold me-5'>Save Draft</button>
            <button onClick={handleClear} className='btn btn-warning fw-semibold'>Clear Board</button>
        </div>
    </div>
  )
}

export default EditingComponent