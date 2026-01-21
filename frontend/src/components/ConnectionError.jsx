import React from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ConnectionError({ onRetry, message = "Connection Problem" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full" />
        <div className="relative w-20 h-20 rounded-full bg-neutral-900 border-2 border-red-600/30 flex items-center justify-center">
          <WifiOff className="w-10 h-10 text-red-600" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
        {message}
      </h3>
      
      <p className="text-gray-400 mb-1 max-w-md">
        Unable to connect to the server. Please check your internet connection and try again.
      </p>
      
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-red-600/30 rounded-full text-red-500 text-sm font-mono mb-6">
        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
        ERROR CODE: 600
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-full uppercase tracking-wider text-xs hover:bg-red-700 transition-all group"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          Retry Connection
        </button>
      )}
    </motion.div>
  );
}
