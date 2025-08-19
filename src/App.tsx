
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DesignerForm from './designer/DesignerForm';

function App() {

    return (
        <>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<DesignerForm />} />
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
