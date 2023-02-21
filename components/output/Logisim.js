import {bin2hex} from '@/lib/conversores';
import {cleanBinaryData} from '@/lib/outputFormarters';

export default function Logisim({binary}) {
  const hex = cleanBinaryData(binary).map((e) => bin2hex(e));
  return (
    <div className='font-mono break-normal'>
      <span className=''>
        v2.0 raw
      </span>
      <br />
      <span className=''>
        {hex.toString().replaceAll(',', ' ')}
      </span>
    </div>
  );
}
