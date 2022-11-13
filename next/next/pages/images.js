
function RenderImage({ data }) {
    return(    // Get the image data
        <div>
            {data.images.map(function(images){                
                let imagess = images['capture']['data'];
                
                // Convert into blob into string with charset=utf-8
                let image = "data:image/png;base64," + Buffer.from(imagess, 'base64').toString('utf-8');
                // string date and time
                let date_time = images['date_time'];
                // Render into HTML
                return (
                        <div>
                            <p> Motion Detected at: {date_time}</p>
                            <img src={image} alt="" width="500" height="500" />
                        </div>
                        )
            })}
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from the server
    const response = await fetch('http://localhost:3000/render-image');

    // Get the json response
    const data = await response.json();
    if ( !data ) {
        return {
            notFound: true,
        }
    }
    return {
        props: { data },
    }
}

export default RenderImage;
