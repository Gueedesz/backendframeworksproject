var modal = document.getElementById("myModal");
        var modalBackground = document.getElementById("modalBackground");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function () {
            modal.style.display = "block";
            modalBackground.style.display = "block";
        }

        span.onclick = function () {
            modal.style.display = "none";
            modalBackground.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modalBackground) {
                modal.style.display = "none";
                modalBackground.style.display = "none";
            }
        }

