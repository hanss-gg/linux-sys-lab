FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    openssh-server \
    python3 \
    sudo \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash ansible && \
    echo "ansible ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN mkdir /var/run/sshd && \
    mkdir -p /home/ansible/.ssh && \
    chmod 700 /home/ansible/.ssh

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
