import React, { useState, useRef, useEffect } from 'react';

interface LivePhotoCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const LivePhotoCapture: React.FC<LivePhotoCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please check your browser permissions.");
      }
    };

    if (!capturedImage) {
        startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stream?.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setError(null);
  };
  
  const handleConfirm = () => {
    if (canvasRef.current) {
        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'live-photo.jpg', { type: 'image/jpeg' });
                onCapture(file);
                onClose();
            }
        }, 'image/jpeg', 0.9);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-lg overflow-hidden relative">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{capturedImage ? 'Confirm Photo' : 'Capture Live Photo'}</h2>
          
          {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
          
          <div className="relative aspect-video bg-slate-900 rounded-md overflow-hidden">
            {capturedImage ? (
                <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
            ) : (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            {capturedImage ? (
              <>
                <button onClick={handleRetake} className="bg-slate-600 text-slate-100 font-bold py-3 px-6 rounded-md hover:bg-slate-500 transition-colors">
                  Retake
                </button>
                <button onClick={handleConfirm} className="bg-orange-600 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-700 transition-colors">
                  Confirm & Use Photo
                </button>
              </>
            ) : (
              <button onClick={handleCapture} disabled={!!error} className="bg-orange-600 text-white font-bold w-20 h-20 p-2 rounded-full hover:bg-orange-700 transition-colors disabled:bg-slate-500 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full border-4 border-orange-600"></div>
              </button>
            )}
          </div>
        </div>
         <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 bg-slate-900/50 rounded-full p-1 hover:bg-slate-900/75">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default LivePhotoCapture;