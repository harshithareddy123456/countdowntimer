import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [hour, sethour] = useState(0);
  const [minute, setminute] = useState(0);
  const [sec, setsec] = useState(0);
  const [isstart, setisstart] = useState(false);
  const [err, seterr] = useState(false);
  useEffect(() => {
    let interval = null;
    if (isstart && (hour > 0 || minute > 0 || sec > 0)) {
      interval = setInterval(() => {
        if (sec > 0) {
          setsec((sec) => sec - 1);
        } else if (minute > 0) {
          setminute((minute) => minute - 1);
          setsec(59);
        } else if (hour > 0) {
          sethour((hour) => hour - 1);
          setminute(59);
          setsec(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isstart, sec, minute, hour]);

  const handlestart = () => {
    if (hour === 0 && minute === 0 && sec === 0) {
      seterr(true);
    } else {
      setisstart(true);
      seterr(false);
    }
  };
  const handlereset = () => {
    sethour(0);
    setminute(0);
    setsec(0);
    setisstart(false);
  };
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  return (
    <div className="container">
      <div>
        <h1>Countdown Timer</h1>
      </div>
      <div className="middle">
        <div>
          <input
            className="input"
            type="number"
            value={formatTime(hour)}
            onChange={(e) =>
              sethour(Math.max(0, Math.min(23, parseInt(e.target.value))))
            }
            placeholder="00"
          ></input>
        </div>
        <span>:</span>
        <div>
          <input
            className="input"
            type="number"
            value={formatTime(minute)}
            onChange={(e) =>
              setminute(Math.max(0, Math.min(60, parseInt(e.target.value))))
            }
            placeholder="00"
          ></input>
        </div>
        <span>:</span>
        <div>
          <input
            className="input"
            type="number"
            value={formatTime(sec)}
            onChange={(e) =>
              setsec(Math.max(0, Math.min(60, parseInt(e.target.value))))
            }
            placeholder="00"
          ></input>
        </div>
      </div>
      <div className="bottom">
        {isstart ? (
          <button className="start" onClick={() => setisstart(false)}>
            Pause
          </button>
        ) : (
          <button className="start" onClick={handlestart}>
            Start
          </button>
        )}
        <button className="reset" onClick={handlereset}>
          Reset
        </button>
      </div>
      {err && <div>please provide a value</div>}
    </div>
  );
}

export default App;
