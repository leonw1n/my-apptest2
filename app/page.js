import HandleGenerate from './generate';
import HandleFileUpload from './fileUpload';

export default function Home() {  

  return (
    <main>
      <div>
        <p>IRL POKEDEX</p>
        <div>
            <HandleGenerate />
        </div>
        <div>
            <HandleFileUpload/>
        </div>
      </div>
    <div>
    </div>
    </main>
  )
}
