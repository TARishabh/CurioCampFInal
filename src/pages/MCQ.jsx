import React from 'react'

export default function MCQ() {
    const url = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/"_URL
    const token = import.meta.env.VITE_TOKEN
    const handleonclick = () =>{
        const fetchContentData = async () => {
            try {
              const response = await fetch(`${url}api/content/10/`,{
                method:'GET',
                headers: {
                    Accept: "application/json",
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
              });
              const data = await response.json();
            //   setUserData(data.results);
            } catch (error) {
              console.error("Error fetching user data:", error);
              // Handle error
            }
          };
      
          fetchContentData();
    }
  return (
    <div>
        <button type='button' onClick={handleonclick}>CLICK ME</button>
    </div>
  )
}

