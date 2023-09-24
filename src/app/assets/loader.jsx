import style from './loader.module.css';


const loader = () => {
  return (
    <>
    <div
        className='w-screen h-screen flex justify-center flex-col items-center bg-gray-900'
    >
      <div class={style.book}>
        <div class={style.book__pg_shadow}></div>
        <div class={style.book__pg}></div>
        <div class={`${style.book__pg} ${style.book__pg__2}`}></div>
        <div class={`${style.book__pg} ${style.book__pg__3}`}></div>
        <div class={`${style.book__pg} ${style.book__pg__4}`}></div>
        <div class={`${style.book__pg} ${style.book__pg__5}`}></div>
      </div>
      <p
        className='text-4xl text-white py-3 font-bold capitalize'
      >loading</p>
    </div>
    </>
  );
};

export default loader;