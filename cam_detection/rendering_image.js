import { Blob } from 'buffer';

function RenderImage({data}) {
    const capture = data.capture;

    return (
        <div>
            <img src = "data:capture/jpg;base64,'.base64_encode({capture}).'"/>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/render-image');
    const data = await res.json();
    return {
        props: {data},
    }
}
export default RenderImage
