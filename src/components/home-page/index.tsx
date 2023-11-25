import style from './index.module.scss';
import Service from './components/service';
import Introduce from './components/introduce';
import Welcome from './components/welcome';

export default function Home() {
  return (
    <div className={style.homePageContainer}>
      <Welcome />
      <Introduce />
      <Service />
    </div>
  );
}
