import Uploadfile from '../../assets/upload file.gif'

export function UploadfileGif() {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
           <img src={Uploadfile} alt="upload file" />
      </div>
    );
  }