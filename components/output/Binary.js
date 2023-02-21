function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Bit({bit}) {
  return (
    <div className={classNames(
      bit === '-' ? 'text-red-600' :
      bit === 'x' ? 'text-gray-900' :
      'text-gray-900',
    )}>
      {
        bit === '-' ? 0 :
        bit === 'x' ? 0 : bit
      }
    </div>
  );
}

export default function Binary({binary}) {
  return (
    <code className="font-mono font-medium tracking-wider">
      {binary.map((bitArray, index) => {
        const bits = [...bitArray];
        return (
          <div key={index} className="flex">
            {bits.map((bit, index) => {
              return <Bit key={index} bit={bit} />;
            })}
          </div>
        );
      })}
    </code>
  );
}
