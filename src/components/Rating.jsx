import React from 'react';

const Rating = ({ rating, onRatingChange, readonly = false }) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            fontSize: '24px',
            color: star <= (hoverRating || rating) ? '#ffc107' : '#ddd',
            padding: '0',
            margin: '0 2px'
          }}
          disabled={readonly}
        >
          ★
        </button>
      ))}
      {!readonly && (
        <span style={{ marginLeft: '10px' }}>
          {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
        </span>
      )}
    </div>
  );
};

export default Rating;