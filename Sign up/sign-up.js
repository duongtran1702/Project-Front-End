function save(array) {
    localStorage.setItem('accounts', JSON.stringify(array));
}

function load() {
    let account = localStorage.getItem('accounts');
    return JSON.parse(account) || [];
}

let btn = document.getElementById('sign-up');

class Account {
    constructor(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
class ManageAccount {
    constructor() {
        this.accounts = load();
        this.listError = [];
        if (this.accounts.length === 0) {
            this.accounts.push(
                new Account('admin@gmail.com', 'admin', 'admin12345')
            );
            save(this.accounts);
        }
        this.add();
    }
    validateInput(email, username, password, confirmPassword) {
        let errors = [];
        if (!email) {
            errors.push('Email không được bỏ trống!');
        } else if (!email.includes('@')) {
            errors.push("Email phải chứa ký tự '@'!");
        } else {
            let parts = email.split('@');
            if (parts[0].length === 0) {
                errors.push("Email phải có ký tự trước '@'!");
            } else if (!parts[1].includes('.') || parts[1].startsWith('.')) {
                errors.push('Email phải có tên miền hợp lệ!');
            } else if (!email.endsWith('.vn') && !email.endsWith('.com')) {
                errors.push('Email phải kết thúc bằng ".vn" hoặc ".com"!');
            }
        }

        if (!username) {
            errors.push('Username không được bỏ trống!');
        }

        if (!password) {
            errors.push('Mật khẩu không được bỏ trống!');
        } else if (password.length < 8) {
            errors.push('Mật khẩu phải có ít nhất 8 kí tự!');
        }

        if (!confirmPassword) {
            errors.push('Mật khẩu xác nhận không được trống!');
        } else if (confirmPassword !== password) {
            errors.push('Mật khẩu nhập lại không trùng khớp!');
        }

        let found = this.accounts.find((temp) => temp.username === username);
        if (found) {
            errors.push('Username đã tồn tại !Vui lòng nhập lại');
        }

        let found_2 = this.accounts.find((temp) => temp.email === email);
        if (found_2) {
            errors.push('Email đã tồn tại !Vui lòng nhập lại');
        }

        if (errors.length > 0) {
            this.listError.push({ error: errors, status: false });
            if (this.listError.length > 2) {
                this.listError.shift();
            }
            console.log(this.listError);

            return false;
        }
        this.listError.push({
            error: ['Đăng kí thành công'],
            status: true,
        });
        if (this.listError.length > 2) {
            this.listError.shift();
        }
        console.log(this.listError);
        return true;
    }
    add() {
        btn.addEventListener('click', () => {
            let email = document.getElementById('email').value.trim();
            let username = document.getElementById('username').value.trim();
            let password = document.getElementById('password').value.trim();
            let confirmPassword = document
                .getElementById('check-password')
                .value.trim();

            if (
                this.validateInput(email, username, password, confirmPassword)
            ) {
                this.accounts.push(new Account(email, username, password));
                save(this.accounts);
                this.render();
                setTimeout(() => {
                    window.location.href = '/Sign%20in/sign-in.html';
                },500);
            }
            this.render();
        });
    }
    render() {
        let notifications = document.getElementById('notifications');
        notifications.innerHTML = '';

        this.listError.forEach((temp, index) => {
            if (temp.status === true) {
                let notiTrue = document.createElement('div');
                notiTrue.className = 'noti-true';
                notiTrue.innerHTML = `<div class="checked">
            <i class="fa-solid fa-check" style="color: white"></i>
            </div>
            ${temp.error[0]}`;
                notifications.appendChild(notiTrue);
            }
            if (temp.status === false) {
                let notiFalse = document.createElement('div');
                notiFalse.className = 'noti-false';

                let nav = document.createElement('nav');
                nav.innerHTML = `<aside>
                <div class="remove-circle"><div></div></div>
                <div>Error</div>
                </aside>
                `;

                let closeDiv = document.createElement('div');
                closeDiv.className = 'close';
                closeDiv.innerHTML = `<i class="fa-solid fa-xmark" style="color: rgba(68, 82, 117, 1);"></i>`;
                closeDiv.addEventListener('click', () => {
                    this.close(index);
                });
                nav.appendChild(closeDiv);
                notiFalse.appendChild(nav);

                let notiContent = document.createElement('div');
                notiContent.className = 'noti-content';
                temp.error.forEach((er) => {
                    let div = document.createElement('div');
                    div.innerText = er;
                    notiContent.appendChild(div);
                });
                notiFalse.appendChild(notiContent);
                notifications.appendChild(notiFalse);
            }
        });
    }
    close(index) {
        this.listError.splice(index, 1);
        this.render();
    }
}
new ManageAccount();
