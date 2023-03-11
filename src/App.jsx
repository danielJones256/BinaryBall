import { useEffect, useState } from "react";
import BlueBall from "./assets/BlueBall.svg";
import RedBall from "./assets/RedBall.svg";

//I have used React and Tailwind CSS to create this small, and fun project.

function App() {
  const [num, setNum] = useState();

  // Below is a cookie creator/updater function which will take a key (name), a value, and an expiry date as parameters.
  // It converts the given days into milliseconds added to the current time.
  const setCookie = (name, value, daysToLive) => {
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    let expires = "expires" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires};`;
  };

  // Below is a get cookies function which returns the value which is associated with a key.
  const getCookie = (name) => {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ");
    let result;
    cArray.forEach((item) => {
      if (item.indexOf(name) === 0) {
        result = item.substring(name.length + 1);
      }
    });
    return parseInt(result);
  };

  // Below is a random number generator function which returns a random number, either one or zero, one being truthy has been allocated to the blue ball.
  // Zero is allocated to the red ball.
  const getRandomNum = () => {
    return Math.floor(Math.random() * 2);
  };

  //Below are the two states used to hold the counts for each ball.
  const [redCount, setRedCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);

  // Below is a function which checks what num is, and then adds one to the relevant count and then updates the relevant cookie too.
  const setCookieCount = () => {
    if (num === 1) {
      const newCount = blueCount + 1;
      setBlueCount(newCount);
      setCookie("BlueCount", newCount, 365);
    } else if (num === 0) {
      const newCount = redCount + 1;
      setRedCount(newCount);
      setCookie("RedCount", newCount, 365);
    }
  };

  // The use effect below only runs on the first render and creates a cookie for the most recent value of num.
  // blueCountCookie and redCountCookie are just being checked for the same thing. The reason for the isNan function is to ensure that the value that is returned from the getCookie method,
  // is not a NaN value, which it is on the first render after parseInt takes in an undefined value.
  useEffect(() => {
    const lastNumCookie = getCookie("lastNum");
    const blueCountCookie = getCookie("BlueCount");
    const redCountCookie = getCookie("RedCount");
    setBlueCount(isNaN(blueCountCookie) ? 0 : blueCountCookie);
    setRedCount(isNaN(redCountCookie) ? 0 : redCountCookie);

    if (isNaN(lastNumCookie)) {
      const number = getRandomNum();
      setNum(number);
      setCookie("lastNum", number, 365);
    } else {
      setNum(lastNumCookie);
    }
  }, []);

  //The use effect below sets the cookie counts and is invoked when num is changed.
  useEffect(() => {
    setCookieCount();
  }, [num]);

  // The handle click below calls for a new random number from getRandomNum and stores the previous value of num. Num is set to the new value and the cookie is updated.
  // If previous num and new num are the same, it means the purple button returned the same number as before and so the counts can be updated using setCookieCount.
  // If num is different to the previous value then the use effect directly above will trigger and update the counts and cookies accordingly.
  const getNewBallColour = () => {
    const newNumber = getRandomNum();
    const prevNum = num;
    setNum(newNumber);
    setCookie("lastNum", newNumber, 365);
    if (prevNum === newNumber) {
      setCookieCount();
    }
  };

  //I preferred to make my own design for the coloured ball in Figma rather than using an online image.
  return (
    <>
      <div className="flex items-center justify-center">
        <p className="text-6xl font-bold mt-40">Binary Ball</p>
      </div>
      <div className="flex items-center justify-center mt-2">
        <div>
          {num ? (
            <img src={BlueBall} className="mt-10" />
          ) : (
            <img src={RedBall} className="mt-10" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-xl mt-10">Blue count: {blueCount}</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-xl mt-2">Red count: {redCount}</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-10"
          onClick={getNewBallColour}
        >
          Click to have a chance at a new colour!
        </button>
      </div>
    </>
  );
}

export default App;
