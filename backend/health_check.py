import requests
import time
import json
import subprocess
import threading
from enum import Enum

class HealthStatus(Enum):
    HEALTHY = 'healthy'
    UNHEALTHY = 'unhealthy'
    ERROR = 'error'

class NodeJsHealthChecker:
    def __init__(self, notify_url, check_interval, node_server_command):
        self.notify_url = notify_url
        self.check_interval = check_interval
        self.node_server_command = node_server_command

    def notify_alive(self):
        while True:
            try:
                payload = json.dumps({'message': 'I am alive'})
                headers = {'Content-Type': 'application/json'}
                response = requests.post(self.notify_url, data=payload, headers=headers)
                if response.status_code == 200:
                    print('Notified Node.js server that Python server is alive.')
                else:
                    print(f'Failed to notify Node.js server: {response.status_code} - {response.text}')
            except requests.RequestException as e:
                print(f'Error notifying Node.js server: {e}')
                self.send_dead_message()
                self.start_node_server()
            time.sleep(self.check_interval)

    def send_dead_message(self):
        try:
            payload = json.dumps({'message': "I'm dead, continue, who's here"})
            headers = {'Content-Type': 'application/json'}
            response = requests.post(self.notify_url, data=payload, headers=headers)
            if response.status_code == 200:
                print('Notified Node.js server that Python server is dead.')
            else:
                print(f'Failed to notify Node.js server: {response.status_code} - {response.text}')
        except requests.RequestException as e:
            print(f'Error notifying Node.js server of shutdown: {e}')

    def start_node_server(self):
        try:
            print("Starting Node.js server...")
            subprocess.Popen(self.node_server_command, shell=True)
        except Exception as e:
            print(f"Failed to start Node.js server: {e}")

    def start(self):
        notify_thread = threading.Thread(target=self.notify_alive, daemon=True)
        notify_thread.start()
