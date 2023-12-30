
import { Triangle , Rings, Puff,Oval} from 'react-loader-spinner'
import { Spinner } from "@material-tailwind/react";
 
export function Loader() {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
          <Spinner className="h-16 w-16 text-gray-900/50" />

    </div>
  );
}
