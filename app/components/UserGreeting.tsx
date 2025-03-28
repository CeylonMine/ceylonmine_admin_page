'use client';

import { useState, useEffect } from 'react';

export default function UserGreeting() {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to update time and greeting
    const updateTimeAndGreeting = () => {
      const now = new Date();
      
      // Format time
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      };
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
      
      // Format date
      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
      
      // Set greeting based on hour
      const hour = now.getHours();
      let greetingText = '';
      
      if (hour >= 5 && hour < 12) {
        greetingText = 'Good Morning';
      } else if (hour >= 12 && hour < 17) {
        greetingText = 'Good Afternoon';
      } else if (hour >= 17 && hour < 22) {
        greetingText = 'Good Evening';
      } else {
        greetingText = 'Good Night';
      }
      
      setGreeting(greetingText);
    };

    // Update immediately
    updateTimeAndGreeting();
    
    // Update every minute
    const interval = setInterval(updateTimeAndGreeting, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6">
      <div className="text-3xl font-bold mb-2">
        {greeting}
      </div>
      <div className="text-lg">
        {currentTime} • {currentDate}
      </div>
    </div>
  );
} 