import React from 'react';
import { Box, Typography, Avatar, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventsDisplay = ({ events }) => {
  if (!events || !events._embedded || !events._embedded.events) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          borderBottom: '2px solid #8B5CF6',
          pb: 1,
          mb: 3
        }}
      >
        EVENTS NEAR YOU
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {events._embedded.events.map((event, index) => {
          // Get the highest resolution image
          const displayImage = event.images.reduce((prev, current) => {
            return (prev.width > current.width) ? prev : current;
          }).url;

          // Format date
          const eventDate = new Date(event.dates.start.dateTime);
          const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <Grid item xs={12} sm={4} md={2.4} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '16px',
                    padding: '20px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  <Avatar
                    src={displayImage}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: '3px solid #8B5CF6',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 1
                    }}
                  >
                    {event.name}
                  </Typography>
                  
                  <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      icon={<CalendarTodayIcon sx={{ color: '#8B5CF6 !important' }} />}
                      label={formattedDate}
                      sx={{
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        color: 'white',
                        '& .MuiChip-label': {
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                    <Chip
                      icon={<LocationOnIcon sx={{ color: '#EC4899 !important' }} />}
                      label={`${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`}
                      sx={{
                        backgroundColor: 'rgba(236, 72, 153, 0.1)',
                        color: 'white',
                        '& .MuiChip-label': {
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default EventsDisplay; 