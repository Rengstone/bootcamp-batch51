let myProject = []

function addProject(event) {

    event.preventDefault()

    let project_name    = document.getElementById('projectName').value
    let startDate       = new Date(document.getElementById('startDate').value)
    let endDate         = new Date(document.getElementById('endDate').value)
    let durasi          = getDistanceTime(startDate, endDate)
    let descInput       = document.getElementById('description').value

    let node    = document.getElementById('node')
    if (node.checked) {
        node = '<i class="fa-brands fa-node"></i>'
    }else{
        node = ''
    }

    let next    = document.getElementById('next')
    if (next.checked) {
        next = '<i class="fa-brands fa-node-js"></i>'
    }else{
        next = ''
    }

    let react    = document.getElementById('react')
    if (react.checked) {
        react = '<i class="fa-brands fa-react"></i>'
    }else{
        react = ''
    }

    let typescript  = document.getElementById('typescript')
    if (typescript.checked) {
        typescript  = '<i class="fa-solid fa-text-height"></i>'
    }else{
        typescript  = ''
    }

    let imageInput      = document.getElementById('inputImage').files
    imageInput = URL.createObjectURL(imageInput[0])


    const project = {
        projectName : project_name,
        duration    : durasi,
        description : descInput,
        nodejs      : node,
        nextjs      : next,
        reactjs     : react,
        typescript  : typescript,
        image       : imageInput
    }

    myProject.push(project)
    renderProject()
}

function renderProject(){
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < myProject.length; index++) {
        document.getElementById("contents").innerHTML += `
        <div class="blog-item">
            <img src="${myProject[index].image}" alt="">
            <a href="project-detail.html
            ">${myProject[index].projectName}</a>
            <p class="time">${myProject[index].duration}</p>
            <p class="description">
                ${myProject[index].description}
            </p>
            <div class="logo" id="logo-tech">
                ${myProject[index].nodejs}
                ${myProject[index].nextjs}
                ${myProject[index].reactjs}
                ${myProject[index].typescript}
            </div>
            <div class="button-group">
                <a href="#" class="button">edit</a>
                <a href="#" class="button">delete</a>
            </div>
        </div>`
    }
}

function getDistanceTime(start, end) {
    let timePost    = start
    let timeNow     = end
    let distance    = timeNow - timePost
    let disMonth    = Math.floor(distance / (1000 * 60 * 60 * 24 * 30))
    let disDay      = Math.floor(distance / (1000 * 60 * 60 * 24))
    let disHour     = Math.floor(distance / (1000 * 60 * 60))
    let disMinute   = Math.floor(distance / (1000 * 60))
    let disSecond   = Math.floor(distance / (1000))
    // distance = distance / 1000
    // return `${Math.floor(distance)} Second Ago`
    if (disMonth > 0) {
        return `Durasi: ${disMonth} Bulan`
    } else if(disDay > 0){
        return `Durasi: ${disDay} Hari`
    } else if(disHour > 0){
        return `Durasi: ${disHour} Jam`
    } else if(disMinute > 0){
        return `Durasi: ${disMinute} Menit`
    } else if(disSecond > 0){
        return `Durasi: ${disSecond} Detik`
    }
}