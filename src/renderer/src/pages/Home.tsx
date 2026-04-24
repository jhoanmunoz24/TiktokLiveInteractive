import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Minigames from '../components/Minigames'
const Home = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBar></SideBar>
        <div className="flex flex-col flex-1 gap-4 text-on-surface " >
          <Header></Header>

          <Minigames></Minigames>
        </div>
      </div>
    </>
  )
}

export default Home
