const https = require("https");

https
  .get("https://coderbyte.com/api/challenges/json/json-cleaning", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const obj = JSON.parse(data);
      let removedCount = 0;

      function clean(value) {
        const invalidValues = ["N/A", "-", ""];

        // Handle arrays
        if (Array.isArray(value)) {
          return value.reduce((arr, item) => {
            if (invalidValues.includes(item)) {
              removedCount++;
            } else {
              arr.push(clean(item));
            }
            return arr;
          }, []);
        }

        // Handle objects
        if (value !== null && typeof value === "object") {
          const result = {};

          for (const key in value) {
            if (invalidValues.includes(value[key])) {
              removedCount++;
            } else {
              result[key] = clean(value[key]);
            }
          }

          return result;
        }

        return value;
      }

      const cleanedObj = clean(obj);
      cleanedObj.items_removed = removedCount;

      console.log(JSON.stringify(cleanedObj));
    });
  })
  .on("error", (err) => {
    console.error(err.message);
  });
