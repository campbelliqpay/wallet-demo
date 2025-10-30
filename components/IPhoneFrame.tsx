import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative w-[400px] h-[864px] bg-gradient-to-b from-gray-900 to-black rounded-[65px] shadow-2xl overflow-hidden border-[16px] border-black" style={{
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
    }}>
      {/* Side buttons */}
      <div className="absolute left-[-4px] top-[140px] w-[4px] h-[32px] bg-gray-900 rounded-l-md"></div>
      <div className="absolute left-[-4px] top-[185px] w-[4px] h-[60px] bg-gray-900 rounded-l-md"></div>
      <div className="absolute left-[-4px] top-[255px] w-[4px] h-[60px] bg-gray-900 rounded-l-md"></div>
      <div className="absolute right-[-4px] top-[200px] w-[4px] h-[80px] bg-gray-900 rounded-r-md"></div>

      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[220px] h-[32px] bg-black rounded-b-[22px] z-50 flex items-center justify-center gap-2">
        {/* Speaker */}
        <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-2"></div>
        {/* Camera */}
        <div className="w-2.5 h-2.5 bg-gray-800 rounded-full mt-2"></div>
      </div>

      {/* Screen */}
      <div className="relative w-full h-full bg-white overflow-hidden rounded-[49px]">
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-white/30 rounded-full z-50"></div>
    </div>
  );
}
