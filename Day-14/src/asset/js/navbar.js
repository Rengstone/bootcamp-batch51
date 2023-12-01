function toggleNav(){
    let menu = document.getElementById('toggle-nav')

    if (menu.style.display === "none") {
        menu.style.display = "flex"
    }else{
        menu.style.display = "none"
    }
    
}