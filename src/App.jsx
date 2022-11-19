import classNames from 'classnames';
import {
  useEffect, useMemo, useState,
} from 'react';
import './app.css';

const initialPixels = Array(1364)
  .fill().map((item, index) => ({ id: index }));

export const App = () => {
  const [activePixels, setActivePixels] = useState([]);
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [isShowedActivePixels, setIsShowedActivePixels] = useState(false);
  const [size, setSize] = useState('large');

  const handleButtonPress = ({ ctrlKey }) => {
    if (ctrlKey) {
      setIsKeyPressed(true);
    } else {
      setIsKeyPressed(false);
    }
  };

  const pixels = useMemo(() => {
    switch (size) {
      case 'small':
        return initialPixels.slice(0, 600);

      case 'medium':
        return initialPixels.slice(0, 903);

      case 'large':
      default:
        return initialPixels;
    }
  }, [size]);

  const handleBackroundChange = (item, event) => {
    if (isShowedActivePixels) {
      return;
    }

    if (isKeyPressed) {
      if (!activePixels.includes(item)) {
        setActivePixels(prev => [...prev, item]);
      }

      event.target.className = 'pixel--hover';

      setTimeout(() => {
        event.target.className = 'pixel';
      }, 500);
    }
  };

  const handleStatusChange = (value) => {
    setActivePixels([]);

    switch (value) {
      case 'small':
        return setSize('small');

      case 'medium':
        return setSize('medium');

      case 'large':
      default:
        return setSize('large');
    }
  };

  const handleReset = () => {
    setIsShowedActivePixels(false);
    setActivePixels([]);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleButtonPress);
    document.addEventListener('keyup', handleButtonPress);

    return () => {
      document.removeEventListener('keydown', handleButtonPress);
      document.removeEventListener('keyup', handleButtonPress);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        pixels app
      </h1>

      <label>
        <select
          className="select"
          value={size}
          onChange={event => (handleStatusChange(event.target.value))}
        >
          <option value="large">
            large board
          </option>

          <option value="medium">
            medium board
          </option>

          <option value="small">
            small board
          </option>
        </select>
      </label>

      <div
        className={classNames('grid',
          {
            'large-size': size === 'large',
            'medium-size': size === 'medium',
            'small-size': size === 'small',
          })}
      >
        {pixels.map((pixel) => (
          <div
            className={classNames('pixel',
              {
                'pixel--background': (
                  isShowedActivePixels && activePixels.includes(pixel)
                ),
              })}
            key={pixel.id}
            onMouseEnter={(event) => handleBackroundChange(pixel, event)}
          />
        ))}
      </div>

      {!isShowedActivePixels && (
        <p
          className={isKeyPressed && !isShowedActivePixels
            ? 'text--active'
            : 'text'}
        >
          {isKeyPressed && !isShowedActivePixels
            ? ('Ctrl is pressed, now you can active pixels')
            : ('To activate pixels you need to press and hold button Ctrl')}
        </p>
      )}

      {isShowedActivePixels
        && (
          <p className="text">
            Can&rsquo;t paint while pixels are showed
          </p>
        )}

      <div className="wrapper">
        <button
          className="button button--size"
          type="button"
          onClick={() => setIsShowedActivePixels(!isShowedActivePixels)}
        >
          {!isShowedActivePixels
            ? 'show active pixels'
            : 'hide active pixels'}
        </button>

        <button
          className="button"
          type="button"
          onClick={handleReset}
        >
          reset
        </button>
      </div>
    </div>
  );
};
