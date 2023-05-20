import * as path from "path";
import chokidar from "chokidar";



const distPath = path.join("..", "dist");

const NODE_MODULES =
  "C:\\projects\\pmi\\Development\\Web\\WebstormProjects\\cra-fttx\\node_modules\\@parsimap\\react-mapbox-gl";

console.log(NODE_MODULES)

chokidar.watch(path.join(distPath)).on("all", (_, path, details) => {
  console.log(path)
  console.log(details, 'details');
  // execSync(`copy ${distPath} ${NODE_MODULES}`);
  // console.log("copied")
});
