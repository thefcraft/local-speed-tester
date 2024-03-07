import style from './App.module.css';

function runSpeedTest(size) {
  const startTime = performance.now();
  const speedometerText = document.getElementById('speedometer_text');
  const result = document.getElementById('result');
  const arrow_wrapper = document.getElementById('arrow').parentElement;
  // using proxy makes speed slower
  // console.log(window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]+":5000");
  fetch(`${window.location.href.split(":")[0]+":"+window.location.href.split(":")[1]}:5000/api/data/${size}`).then(response => {
    // Read the response body as a ReadableStream
    const reader = response.body.getReader();
    const speedometer_scales = [];
    const backgroundColors = [
      'rgb(0, 128, 0)',
      'rgb(8, 181, 8)', 
      'rgb(21, 202, 21)',
      'rgb(43, 244, 43)',
      'rgb(79, 251, 79)',
      'rgb(133, 251, 79)',
      'rgb(199, 251, 79)',
      'rgb(228, 251, 79)',
      'rgb(251, 251, 79)',
      'rgb(251, 234, 79)',
      'rgb(251, 205, 79)',
      'rgb(251, 168, 79)',
      'rgb(251, 139, 79)',
      'rgb(251, 122, 79)',
      'rgb(251, 99, 79)',
      'rgb(251, 61, 47)',
      'rgb(251, 47, 47)',
      'rgb(251, 21, 21)',
      'rgb(255, 0, 0)'
    ];
    let idxLast = 0;
    for (let i = 0; i <= 18; i++) {speedometer_scales.push(document.getElementById('speedometer_scale_'+(i*10).toString()));}
    
    let receivedBytes = 0;

    // Read the stream to completion
    return new Promise((resolve, reject) => {
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            // Calculate speed after the entire file has been downloaded
            const endTime = performance.now();
            const elapsedTime = endTime - startTime;
            const speed = size / (elapsedTime / 1000); // Calculate speed in MBps per second
            const speedInMbps = (speed * 8); // Convert speed to Mbps
            console.log(`Downloaded ${size} MB in ${elapsedTime} milliseconds (${speedInMbps.toFixed(2)} Mbps)`);
            result.innerHTML = `Downloaded ${size} MB in ${elapsedTime} ms<br>${speedInMbps.toFixed(2)} Mbps<br>${speed.toFixed(2)} MBps`;
        // Downloaded 512 MB in 1658 milliseconds (2470.45 Mbps)
            resolve();
            return;
          }else{
            const speedMBps = (receivedBytes/1024/1024)/((performance.now() - startTime)/1000);
            const angle = Math.min(180, Math.max(speedMBps, 120), 120+(speedMBps-120)/7)
            if(idxLast>Math.floor(angle/10)){
              for (let i = Math.floor(angle/10); i <= idxLast; i++) {speedometer_scales[i].style.backgroundColor = 'rgb(0, 0, 0)';}
            }
            idxLast = Math.floor(angle/10);
            for (let i = 0; i <= Math.floor(angle/10); i++) {
              speedometer_scales[i].style.backgroundColor = backgroundColors[i];
            }
         
            arrow_wrapper.style.transform = `rotate(${angle}deg)`;
            // console.log(`${receivedBytes/1024/1024} MB downloaded ... ${speedMBps} MBps`);
            speedometerText.innerHTML = `${(speedMBps).toFixed(0)}`;
          }

          // Update the receivedBytes count
          receivedBytes += value.byteLength;
          // Continue reading the stream
          read();
        }).catch(reject);
      }

      read();
    });
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
}

function setArrow(){
  const arrow_wrapper = document.getElementById('arrow').parentElement;
  arrow_wrapper.style.transform = 'rotate(20deg)';
}

function App() {
  return (
    <div className={style.speedometer_container}>
       <div className={style.speedometer_center}></div>
       <div className={style.speedometer_hide_center}></div>
       <div className={style.speedometer_hide_bottom}>

        <button className={style.btn} onClick={()=>{runSpeedTest(1024);}}>  
          Test
        </button> 

        <span id='result'>
        </span>

       </div>
       <div className={style.speedometer_arrow_container}>
        <div className={style.arrow_wrapper}>
          <div className={style.arrow} id='arrow'>
          </div>
        </div>
       </div>

       <div className={style.speedometer_text}>
        <div className={style.static}>Speed</div>
        <div className={style.dynamic}>
          <span id='speedometer_text'>0</span> MBps
        </div>
       </div>

       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_0} id='speedometer_scale_0'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_10} id='speedometer_scale_10'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_20} id='speedometer_scale_20'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_30} id='speedometer_scale_30'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_40} id='speedometer_scale_40'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_50} id='speedometer_scale_50'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_60} id='speedometer_scale_60'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_70} id='speedometer_scale_70'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_80} id='speedometer_scale_80'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_90} id='speedometer_scale_90'></div>
       
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_100} id='speedometer_scale_100'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_110} id='speedometer_scale_110'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_120} id='speedometer_scale_120'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_130} id='speedometer_scale_130'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_140} id='speedometer_scale_140'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_150} id='speedometer_scale_150'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_160} id='speedometer_scale_160'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_170} id='speedometer_scale_170'></div>
       <div className={style.speedometer_scale + ' ' + style.speedometer_scale_180} id='speedometer_scale_180'></div>

    </div>
  )
}

export default App
