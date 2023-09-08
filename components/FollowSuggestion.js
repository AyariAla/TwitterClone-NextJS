import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Image from 'next/image';

function FollowSuggestion({ result }) {
  return (
    <div className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center'>
      <Image
        src={result?.userImg}
        // src={
        //   result
        //     ? result?.userImg
        //     : 'https://openseauserdata.com/files/aabc89aee6e21ea107f77c783c96e011.gif'
        // }
        width={50}
        height={50}
        alt='name'
        objectFit='cover'
        className='rounded-full'
      />
      <div className='ml-4 leading-5 group'>
        <h4 className='font-bold group-hover:underline'>{result.username}</h4>
        <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
      </div>
      <button className='ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5'>
        Follow
      </button>
    </div>
  );
}

export default FollowSuggestion;
