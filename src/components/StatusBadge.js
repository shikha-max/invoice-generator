import React from 'react';
import { Chip } from '@mui/material';

const getStatusColor = ({data}) => {
 

  const dueDate = new Date(data.due);       // e.g., "2025-03-31"
  const currDate = new Date(data.currDate); // e.g., "2025-04-06"
  
  let status =
    data.balance === 0
      ? 'paid'
      : dueDate < currDate
      ? 'overdue'
      : 'pending';
    switch (status?.toLowerCase()) {
    case 'paid':
      return { label: 'Paid', color: 'success' };
    case 'pending':
      return { label: 'Pending', color: 'warning' };
    case 'overdue':
      return { label: 'Overdue', color: 'error' };
    default:
      return { label: 'Unknown', color: 'default' };
  }
};

const StatusBadge = ({ data }) => {
  if(!data) return null;
  const { label, color } = getStatusColor({data});

  return (
    <Chip
      label={label}
      color={color}
      variant="filled"
      sx={{ fontWeight: 500, textTransform: 'capitalize' }}
    />
  );
};

export default StatusBadge;
