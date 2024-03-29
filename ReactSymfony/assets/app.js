import { registerReactControllerComponents } from '@symfony/ux-react';
import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './styles/Content.css'
import './styles/Sidebar.css'
import './styles/Navbar.css'
import './styles/User.css'
import './styles/Chart.css'
import './styles/Media.css'
import './styles/Theme.css'
import './styles/Article.css'
import './styles/Data.css'
import './styles/Dashboard.css'
import './styles/Shape.css'
import './styles/ToolBox.css'
import './styles/Custom.css'
import './styles/Maker.css'
import './styles/ImagePicker.css'
import './styles/DataPicker.css'

registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));