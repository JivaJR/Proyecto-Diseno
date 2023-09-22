import { PagesRotes } from '../paginas/routes/PagesRotes';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
    
    return (
        <>
            
            <Routes>
                <Route path='/*' element={<PagesRotes/>}/>
            </Routes>
        </>
        
        
    )
}
