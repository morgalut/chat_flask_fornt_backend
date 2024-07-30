# backend/health_check.py

import requests
import time
from enum import Enum
import threading
import json

class HealthStatus(Enum):
    HEALTHY = 'healthy'
    UNHEALTHY = 'unhealthy'
    ERROR = 'error'

class NodeJsHealthChecker:
    def __init__(self, notify_url, check_interval):
        self.notify_url = notify_url
        self.check_interval = check_interval
        self.status = HealthStatus.UNHEALTHY

    def notify_alive(self):
        while True:
            try:
                payload = json.dumps({'message': 'I am alive'})
                headers = {'Content-Type': 'application/json'}
                response = requests.post(self.notify_url, data=payload, headers=headers)
                if response.status_code == 200:
                    print('Notified Node.js server that Python server is alive.')
                else:
                    print(f'Failed to notify Node.js server: {response.status_code}')
            except requests.RequestException as e:
                print(f'Error notifying Node.js server: {e}')
            time.sleep(self.check_interval)

    def start(self):
        notify_thread = threading.Thread(target=self.notify_alive, daemon=True)
        notify_thread.start()
