'use client';

import { useEffect, useRef, useState } from 'react';
import { CardsActivityGoal } from '../displayComponents/activity-goal';
import { CardsCalendar } from '../displayComponents/calendar';
import { CardsChat } from '../displayComponents/chat';
import { CardsCookieSettings } from '../displayComponents/cookie-settings';
import { CardsCreateAccount } from '../displayComponents/create-account';
import { CardsDataTable } from '../displayComponents/data-table';
import { CardsMetric } from '../displayComponents/metric';
import { CardsPaymentMethod } from '../displayComponents/payment-method';
import { CardsReportIssue } from '../displayComponents/report-issue';
import { CardsShare } from '../displayComponents/share';
import { CardsStats } from '../displayComponents/stats';
import { CardsTeamMembers } from '../displayComponents/team-members';

// Define components with keys to fix the react/jsx-key error
const components = [
  <CardsActivityGoal key='activity-goal' />,
  <CardsCalendar key='calendar' />,
  <CardsStats key='stats' />,
  <CardsTeamMembers key='team-members' />,
  <CardsMetric key='metric' />,
  <CardsDataTable key='data-table' />,
  <CardsPaymentMethod key='payment-method' />,
  <CardsCreateAccount key='create-account' />,
  <CardsChat key='chat' />,
  <CardsReportIssue key='report-issue' />,
  <CardsCookieSettings key='cookie-settings' />,
  <CardsShare key='share' />,
];

const ComponentGrid = () => {
  const [mounted, setMounted] = useState(false);
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // This ensures the animation runs after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Adjust grid columns based on container width
  useEffect(() => {
    if (!containerRef.current) return;

    // Store the current value of the ref in a variable
    const currentContainer = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        if (width < 768) {
          setColumns(1);
        } else if (width < 1200) {
          setColumns(2);
        } else {
          setColumns(3);
        }
      }
    });

    resizeObserver.observe(currentContainer);

    return () => {
      // Use the stored reference in the cleanup function
      resizeObserver.unobserve(currentContainer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`grid gap-4 my-2 overflow-hidden`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {components.map((component, index) => (
        <div
          key={index}
          className={`transform ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } 
                     transition-all duration-500 ease-in-out`}
          style={{
            transitionDelay: `${index * 50}ms`,
          }}
        >
          {component}
        </div>
      ))}
    </div>
  );
};

export default ComponentGrid;
