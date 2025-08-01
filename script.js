const playerData = {
  "장다민": { gender: "여" },
  "양승하": { gender: "남" },
  "우원석": { gender: "남" },
  "남상훈": { gender: "남" },
  "임예지": { gender: "여" },
  "이준희": { gender: "여" },
  "강민구": { gender: "남" },
  "임동민": { gender: "남" },
  "박소현": { gender: "여" },
  "박대우": { gender: "남" },
  "박은지": { gender: "여" },
  "류재리": { gender: "여" },
  "이재현": { gender: "남" },
  "감사": { gender: "남" },
  "나석훈": { gender: "남" },
  "김나연": { gender: "여" },
  "테스": { gender: "남" },
  "독고혁": { gender: "남" },
  "오리": { gender: "여" },
  "이성훈": { gender: "남" },
  "이종욱": { gender: "남" },
  "최하나": { gender: "여" },
  "김보경": { gender: "여" },
  "김경민": { gender: "남" },
  "모닝": { gender: "여" },
};

let bracket1Players = [];
let bracket3Players = []; // 3번 경기 선수 저장
let bracket4Players = []; // 4번 경기 선수 저장

function convertToTable() {
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');
  
  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>성별</th><th>참석</th><th>늦참</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';
  
  lines.forEach(line => {
    const data = line.trim().split(/\s*\/\s*|\s+/);
    
    if (data.length >= 8) {
      const rank = data[0].replace('.', '');
      const name = data[1];
      const gender = playerData[name] ? playerData[name].gender : '알 수 없음';
      const win = data[2];
      const draw = data[3];
      const lose = data[4];
      const points = data[5] + ' / ' + data[6];
      const goalDiff = data[7];
      const winRate = data[8];
      const participation = data[9];
      
      html += `<tr>
                <td data-rank="${rank}">${rank}</td>
                <td>${name}</td>
                <td>${gender}</td>
                <td><input type="checkbox" class="참석-checkbox" data-name="${name}"></td>
                <td><input type="checkbox" class="늦참-checkbox" data-name="${name}"></td>
                <td>${win}</td>
                <td>${draw}</td>
                <td>${lose}</td>
                <td>${points}</td>
                <td>${goalDiff}</td>
                <td>${winRate}</td>
                <td>${participation}</td>
              </tr>`;
    }
  });
  
  html += '</tbody></table>';
  tableContainer.innerHTML = html;
}

function toggleAllCheckboxes(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });
}

function createBracket1() {
  const bracketContainer = document.getElementById('bracket1Container');
  bracketContainer.innerHTML = '';

  const checkedFemalePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
    .map(cb => {
      const name = cb.getAttribute('data-name');
      const row = cb.closest('tr');
      const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
      return { name, rank, gender: playerData[name].gender };
    })
    .filter(player => player.gender === '여');

  if (checkedFemalePlayers.length !== 4) {
    bracketContainer.innerHTML = '<p>여자 선수 4명을 참석으로 체크해야 1번 경기 대진표를 만들 수 있습니다.</p>';
    return;
  }

  checkedFemalePlayers.sort((a, b) => a.rank - b.rank);
  
  const teamA = [checkedFemalePlayers[0].name, checkedFemalePlayers[3].name];
  const teamB = [checkedFemalePlayers[1].name, checkedFemalePlayers[2].name];
  
  bracket1Players = checkedFemalePlayers.map(p => p.name);

  const bracketHTML = `
    <h3>1번경기 (여자)</h3>
    <p><strong>Team A:</strong> ${teamA[0]} &amp; ${teamA[1]}</p>
    <p><strong>Team B:</strong> ${teamB[0]} &amp; ${teamB[1]}</p>
    <p><strong>Match Up:</strong> Team A vs Team B</p>
  `;
  
  bracketContainer.innerHTML = bracketHTML;
}

function createBracket2() {
    const bracketContainer = document.getElementById('bracket2Container');
    bracketContainer.innerHTML = '';
    
    const availablePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
        .filter(cb => !cb.closest('tr').querySelector('.늦참-checkbox').checked)
        .map(cb => {
            const name = cb.getAttribute('data-name');
            const row = cb.closest('tr');
            const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
            return { name, rank };
        })
        .filter(player => !bracket1Players.includes(player.name));

    if (availablePlayers.length < 4) {
        bracketContainer.innerHTML = '<p>2번 경기를 만들 수 있는 선수가 4명 미만입니다.</p>';
        return;
    }
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(availablePlayers);
    const selectedPlayers = availablePlayers.slice(0, 4);

    selectedPlayers.sort((a, b) => a.rank - b.rank);

    const teamC = [selectedPlayers[0].name, selectedPlayers[3].name];
    const teamD = [selectedPlayers[1].name, selectedPlayers[2].name];

    const bracketHTML = `
        <h3>2번경기 (남녀 통합)</h3>
        <p><strong>Team C:</strong> ${teamC[0]} &amp; ${teamC[1]}</p>
        <p><strong>Team D:</strong> ${teamD[0]} &amp; ${teamD[1]}</p>
        <p><strong>Match Up:</strong> Team C vs Team D</p>
    `;
    
    bracketContainer.innerHTML = bracketHTML;
}

function createBracket3() {
    const bracketContainer = document.getElementById('bracket3Container');
    bracketContainer.innerHTML = '';
    
    const checkedFemalePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
      .map(cb => {
        const name = cb.getAttribute('data-name');
        const row = cb.closest('tr');
        const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
        return { name, rank, gender: playerData[name].gender };
      })
      .filter(player => player.gender === '여');

    if (checkedFemalePlayers.length !== 4) {
        bracketContainer.innerHTML = '<p>3번 경기를 만들려면 여자 선수 4명을 참석으로 체크해야 합니다.</p>';
        return;
    }
    
    checkedFemalePlayers.sort((a, b) => a.rank - b.rank);
    
    // 3번 경기에 참여하는 선수들을 전역 변수에 저장
    bracket3Players = checkedFemalePlayers.map(p => p.name);

    const teamE = [checkedFemalePlayers[0].name, checkedFemalePlayers[2].name];
    const teamF = [checkedFemalePlayers[1].name, checkedFemalePlayers[3].name];

    const bracketHTML = `
        <hr>
        <h3>3번경기 (여자)</h3>
        <p><strong>Team E:</strong> ${teamE[0]} &amp; ${teamE[1]}</p>
        <p><strong>Team F:</strong> ${teamF[0]} &amp; ${teamF[1]}</p>
        <p><strong>Match Up:</strong> Team E vs Team F</p>
    `;
    
    bracketContainer.innerHTML = bracketHTML;
}

function createBracket4() {
    const bracketContainer = document.getElementById('bracket4Container');
    bracketContainer.innerHTML = '';
    
    const latePlayers = Array.from(document.querySelectorAll('.늦참-checkbox:checked'))
        .map(cb => {
            const name = cb.getAttribute('data-name');
            const row = cb.closest('tr');
            const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
            return { name, rank };
        });

    if (latePlayers.length !== 2) {
        bracketContainer.innerHTML = '<p>4번 경기를 만들려면 늦참 선수가 정확히 2명이어야 합니다.</p>';
        return;
    }

    const mainPlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
        .filter(cb => !cb.closest('tr').querySelector('.늦참-checkbox').checked)
        .map(cb => {
            const name = cb.getAttribute('data-name');
            const row = cb.closest('tr');
            const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
            return { name, rank, gender: playerData[name].gender };
        })
        .filter(player => player.gender !== '여');
        
    if (mainPlayers.length < 2) {
        bracketContainer.innerHTML = '<p>4번 경기를 만들려면 늦참을 제외한 남자 선수가 2명 이상이어야 합니다.</p>';
        return;
    }
    
    const selectedMainPlayers = mainPlayers.slice(0, 2);
    
    // 4번 경기에 참여하는 선수들을 전역 변수에 저장
    bracket4Players = selectedMainPlayers.map(p => p.name).concat(latePlayers.map(p => p.name));

    const allPlayers = [...selectedMainPlayers, ...latePlayers];
    
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffleArray(allPlayers);
    allPlayers.sort((a, b) => a.rank - b.rank);

    const teamG = [allPlayers[0].name, allPlayers[3].name];
    const teamH = [allPlayers[1].name, allPlayers[2].name];

    const bracketHTML = `
        <hr>
        <h3>4번경기 (늦참 포함)</h3>
        <p><strong>Team G:</strong> ${teamG[0]} &amp; ${teamG[1]}</p>
        <p><strong>Team H:</strong> ${teamH[0]} &amp; ${teamH[1]}</p>
        <p><strong>Match Up:</strong> Team G vs Team H</p>
    `;
    
    bracketContainer.innerHTML = bracketHTML;
}

// 5번 경기 대진표 생성 함수
function createBracket5() {
  const bracketContainer = document.getElementById('bracket5Container');
  bracketContainer.innerHTML = '';
  
  // 늦참에 체크된 선수 2명 찾기
  const latePlayers = Array.from(document.querySelectorAll('.늦참-checkbox:checked'))
      .map(cb => {
          const name = cb.getAttribute('data-name');
          const row = cb.closest('tr');
          const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
          return { name, rank };
      });

  if (latePlayers.length !== 2) {
      bracketContainer.innerHTML = '<p>5번 경기를 만들려면 늦참 선수가 정확히 2명이어야 합니다.</p>';
      return;
  }
  
  // 3, 4번 경기에 포함되지 않은 '참석' 선수 2명 찾기
  const availablePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
    .filter(cb => !bracket3Players.includes(cb.getAttribute('data-name')) && !bracket4Players.includes(cb.getAttribute('data-name')))
    .filter(cb => !cb.closest('tr').querySelector('.늦참-checkbox').checked)
    .map(cb => {
      const name = cb.getAttribute('data-name');
      const row = cb.closest('tr');
      const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
      return { name, rank };
    });

  if (availablePlayers.length < 2) {
      bracketContainer.innerHTML = '<p>5번 경기를 만들려면 3, 4번 경기에 포함되지 않은 참석 선수가 2명 이상이어야 합니다.</p>';
      return;
  }

  // 무작위로 2명 선발
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(availablePlayers);
  const selectedAvailablePlayers = availablePlayers.slice(0, 2);

  // A, C를 뽑기 위한 총 4명의 선수
  const groupAC = [...latePlayers, ...selectedAvailablePlayers];
  groupAC.sort((a, b) => a.rank - b.rank);
  const playerA = groupAC[0].name;
  const playerC = groupAC[1].name;

  // B, D를 뽑기 위한 여자 선수들
  const checkedFemalePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
    .map(cb => {
      const name = cb.getAttribute('data-name');
      const row = cb.closest('tr');
      const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
      return { name, rank, gender: playerData[name].gender };
    })
    .filter(player => player.gender === '여');

  if (checkedFemalePlayers.length < 2) {
      bracketContainer.innerHTML = '<p>5번 경기를 만들려면 참석 여자 선수가 2명 이상이어야 합니다.</p>';
      return;
  }

  checkedFemalePlayers.sort((a, b) => a.rank - b.rank);
  const playerD = checkedFemalePlayers[0].name;
  const playerB = checkedFemalePlayers[1].name;
  
  // 대진표 HTML 추가
  const bracketHTML = `
      <hr>
      <h3>5번경기</h3>
      <p><strong>Team A:</strong> ${playerA} &amp; ${playerB}</p>
      <p><strong>Team B:</strong> ${playerC} &amp; ${playerD}</p>
      <p><strong>Match Up:</strong> Team A vs Team B</p>
  `;
  
  bracketContainer.innerHTML = bracketHTML;
}
