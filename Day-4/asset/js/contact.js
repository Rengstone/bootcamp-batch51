function Submit(){
    const name  = document.getElementById("name").value
    const email  = document.getElementById("email").value
    const phone  = document.getElementById("phone").value
    const subject  = document.getElementById("subject").value
    const message  = document.getElementById("message").value
    
    if (name == "") {
        alert("Masukkan name terlebih dahulu")
    }else if (email == "") {
        alert("Masukkan email terlebih dahulu")
    }else if (phone == "") {
        alert("Masukkan phone terlebih dahulu")
    }else if (subject == "") {
        alert("Masukkan subject terlebih dahulu")
    }else if (message == "") {
        alert("Masukkan message terlebih dahulu")
    }else{
        const link = document.createElement('a')
        link.href = `mailto:${email}?subject=${subject}&body=${message}`
        link.click()
    }
}