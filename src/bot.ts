require("dotenv/config");

import Echo from "./helpers/Echo";
import Handler, { botBrain, dash } from "./lib/Handler";

Handler.run().catch(e => {
    dash.stop();
    // Echo.error(e);
    console.log(e)
});

botBrain.launch();
