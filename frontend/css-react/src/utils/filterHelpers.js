import moment from "moment";

const timeFilterHelpers = {};

timeFilterHelpers.filterPointsByThreeHours = (points) => {
  // map through points
  const pointsFilteredByTime = points.filter((point) => {
    // create moment now time
    const currentTime = moment();
    // create time of post
    const postTime = moment(point.time_created);
    // get time difference
    const timeDiffHours = currentTime.diff(postTime, "hours");
    // if time diff < 3 return objects
    if (timeDiffHours < 3) {
      return point;
    }
  });
  return pointsFilteredByTime;
};

timeFilterHelpers.filterPointsByTwelveHours = (points) => {
  // map through points
  const pointsFilteredByTime = points.filter((point) => {
    // create moment now time
    const currentTime = moment();
    // create time of post
    const postTime = moment(point.time_created);
    // get time difference
    const timeDiffHours = currentTime.diff(postTime, "hours");
    // if time diff < 3 return objects
    if (timeDiffHours < 12) {
      return point;
    }
  });
  return pointsFilteredByTime;
};

timeFilterHelpers.filterPointsByTwentyFourHours = (points) => {
  // map through points
  const pointsFilteredByTime = points.filter((point) => {
    // create moment now time
    const currentTime = moment();
    // create time of post
    const postTime = moment(point.time_created);
    // get time difference
    const timeDiffHours = currentTime.diff(postTime, "hours");
    // if time diff < 3 return objects
    if (timeDiffHours < 24) {
      return point;
    }
  });
  return pointsFilteredByTime;
};

timeFilterHelpers.filterPointsBySeventyTwoHours = (points) => {
  // map through points
  const pointsFilteredByTime = points.filter((point) => {
    // create moment now time
    const currentTime = moment();
    // create time of post
    const postTime = moment(point.time_created);
    // get time difference
    const timeDiffHours = currentTime.diff(postTime, "hours");
    // if time diff < 3 return objects
    if (timeDiffHours < 72) {
      return point;
    }
  });
  return pointsFilteredByTime;
};

timeFilterHelpers.filterPointsByOneWeek = (points) => {
  // map through points
  const pointsFilteredByTime = points.filter((point) => {
    // create moment now time
    const currentTime = moment();
    // create time of post
    const postTime = moment(point.time_created);
    // get time difference
    const timeDiffHours = currentTime.diff(postTime, "hours");
    // if time diff < 3 return objects
    if (timeDiffHours < 168) {
      return point;
    }
  });
  return pointsFilteredByTime;
};

export default timeFilterHelpers;
