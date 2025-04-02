function save(acc) {
    localStorage.setItem('account-current', JSON.stringify(acc));
}

function load() {
    let accounts = localStorage.getItem('accounts');
    return accounts ? JSON.parse(accounts) : [];
}

function loadAccCurrent() {
    let account = localStorage.getItem('account-current');
    return account ? JSON.parse(account) : null; // 🔹 Trả về null thay vì []
}

let btn = document.getElementById('sign-in');
let keepLogIn = document.getElementById('remember');

class Account {
    constructor(email, password, status) {
        this.email = email;
        this.password = password;
        this.status = status;
    }
}

class ManageAccount {
    constructor() {
        this.accounts = load();
        this.listError = [];
        this.accountCurrent = null;
        this.remembered = false;

        this.remember();
        this.autoFill();

        btn.addEventListener('click', () => this.handleLogin());
    }
    remember() {
        this.remembered = keepLogIn.checked;
    }

    autoFill() {
        let accCurrent = loadAccCurrent();
        if (accCurrent && accCurrent.status) {
            document.getElementById('email').value = accCurrent.email;
            document.getElementById('password').value = accCurrent.password;
            keepLogIn.checked = true;
            this.remembered = true;
        }
    }

    check(email, password) {
        let errors = [];

        if (!email.trim()) {
            errors.push('Email không được bỏ trống!');
        }
        if (!password.trim()) {
            errors.push('Mật khẩu không được bỏ trống!');
        } else {
            let found = this.accounts.find((acc) => acc.email === email);
            if (!found) {
                errors.push('Email không tồn tại!');
            } else if (found.password !== password) {
                errors.push('Mật khẩu không đúng!');
            }
        }
        if (errors.length > 0) {
            this.listError.push({ error: errors, status: false });
            if (this.listError.length > 2) this.listError.shift();
            return false;
        }

        this.listError.push({ error: ['Đăng nhập thành công'], status: true });
        if (this.listError.length > 2) this.listError.shift();
        return true;
    }

    handleLogin() {
        this.remember();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();

        if (this.check(email, password)) {
            this.accountCurrent = new Account(email, password, this.remembered);
            save(this.accountCurrent);
        }
        this.render();
        setTimeout(() => {
            window.location.href = '/Home/home.html';
        },500);
    }

    render() {
        let notifications = document.getElementById('notifications');
        notifications.innerHTML = '';

        this.listError.forEach((temp, index) => {
            let notification = document.createElement('div');
            notification.className = temp.status ? 'noti-true' : 'noti-false';

            if (temp.status) {
                notification.innerHTML = `
                    <div class="checked">
                        <i class="fa-solid fa-check" style="color: white"></i>
                    </div> ${temp.error[0]}
                `;
            } else {
                let nav = document.createElement('nav');
                nav.innerHTML = `
                    <aside>
                        <div class="remove-circle"><div></div></div>
                        <div>Error</div>
                    </aside>
                `;

                let closeDiv = document.createElement('div');
                closeDiv.className = 'close';
                closeDiv.innerHTML = `<i class="fa-solid fa-xmark" style="color: rgba(68, 82, 117, 1);"></i>`;
                closeDiv.addEventListener('click', () => this.close(index));
                nav.appendChild(closeDiv);

                let notiContent = document.createElement('div');
                notiContent.className = 'noti-content';
                notiContent.innerHTML = temp.error
                    .map((er) => `<div>${er}</div>`)
                    .join('');

                notification.appendChild(nav);
                notification.appendChild(notiContent);
            }

            notifications.appendChild(notification);
        });
    }

    close(index) {
        this.listError.splice(index, 1);
        this.render();
    }
}

new ManageAccount();
