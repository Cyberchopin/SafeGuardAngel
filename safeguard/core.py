from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
import numpy as np
from transformers import pipeline
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ThreatReport:
    """Threat report data structure"""
    timestamp: datetime
    threat_level: float  # Threat level in the range of 0-1
    source_text: str
    detected_patterns: List[str]
    location: Optional[str] = None

class SafeGuardCore:
    def __init__(self):
        """Initialize the SafeGuard AI core system"""
        try:
            # Initialize the sentiment analysis model
            self.sentiment_analyzer = pipeline(
                "sentiment-analysis",
                model="bert-base-multilingual-uncased"
            )

            # Load predefined threat patterns
            self.threat_patterns = self._load_threat_patterns()

            logger.info("SafeGuard Core system initialized successfully")

        except Exception as e:
            logger.error(f"Initialization failed: {str(e)}")
            raise

    def _load_threat_patterns(self) -> dict:
        """Load predefined threat patterns"""
        try:
            with open("data/threat_patterns.json", "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            # If the file does not exist, return to the base pattern
            return {
                "verbal_threats": ["threat", "intimidation", "revenge"],
                "harassment": ["harassment", "tracking", "insult"],
                "violence": ["violence", "harm", "attack"]
            }

    def analyze_text(self, text: str, location: Optional[str] = None) -> ThreatReport:
        """Analyze text content and identify potential threats"""
        try:
            # Sentiment analysis
            sentiment_result = self.sentiment_analyzer(text)[0]

            # Detect threat patterns
            detected_patterns = []
            for category, patterns in self.threat_patterns.items():
                for pattern in patterns:
                    if pattern in text:
                        detected_patterns.append(f"{category}:{pattern}")

            # Calculate threat level
            threat_level = self._calculate_threat_level(
                sentiment_score=sentiment_result["score"],
                pattern_count=len(detected_patterns)
            )

            return ThreatReport(
                timestamp=datetime.now(),
                threat_level=threat_level,
                source_text=text,
                detected_patterns=detected_patterns,
                location=location
            )

        except Exception as e:
            logger.error(f"Text analysis failed: {str(e)}")
            raise

    def _calculate_threat_level(self, sentiment_score: float, pattern_count: int) -> float:
        """Calculate the overall threat level"""
        # Convert sentiment score to threat score (negative sentiment corresponds to higher threat)
        sentiment_threat = 1 - sentiment_score

        # Calculate threat score based on the number of threat patterns detected
        pattern_threat = min(1.0, pattern_count / 5.0)

        # Overall score (give different weights to sentiment analysis and pattern detection)
        threat_level = (0.7 * sentiment_threat + 0.3 * pattern_threat)

        return round(threat_level, 2)

    def generate_safety_recommendations(self, threat_report: ThreatReport) -> List[str]:
        """Generate safety recommendations based on threat report"""
        recommendations = []

        if threat_report.threat_level > 0.8:
            recommendations.extend([
                "Contact police or emergency services immediately",
                "Avoid being alone, find a safe place",
                "Notify trusted family and friends"
            ])
        elif threat_report.threat_level > 0.5:
            recommendations.extend([
                "Stay alert, record any suspicious behavior",
                "Prepare a list of emergency contacts",
                "Consider seeking legal advice"
            ])
        else:
            recommendations.extend([
                "Maintain basic safety awareness",
                "Record any suspicious behavior",
                "Learn about local help resources"
            ])

        return recommendations 